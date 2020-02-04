import React, {Component} from 'react'
import './css/Week.css'
import HoursTitle from "./hours/HoursTitle"
import WeekdayTitle from "./weekday/WeekdayTitle"
import DateUtils from "../utils/DateUtils"
import HoursColumn from './hours/HoursColumn'
import WeekdayColumn from './weekday/WeekdayColumn'
import Timetable from '../utils/Timetable'
import html2canvas from 'html2canvas'

class Week extends Component {

    static WEEK_CONTENT_OFFSET = 12

    ref = React.createRef()

    state = {
        weekdays: ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'nd.'],
        now: new Date(),
        updateLineInterval: null,
        clickedId: null,
        isDuringScreenshot: false,
        screenshotFlash: false
    }

    componentDidMount = () => {
        const height = this.viewContent.scrollHeight
        this.viewContent.scrollTop = 8 * height / 24

        this.setState({updateLineInterval: setInterval(this.updateTime, 60000)})
    }

    componentWillUnmount = () => {
        clearInterval(this.state.updateLineInterval)
    }

    updateTime = () => {
        this.setState({now: new Date()})
    }

    screenshot = (callback) => {
        this.setState({isDuringScreenshot: true}, () => {
            const rect = Array.from(this.viewContent.querySelectorAll(".erebor-weekday-item-wrapper"))
                .reduce((result, element) => {
                    if (element.offsetTop < result.top) {
                        result.top = element.offsetTop
                    }

                    const rect = element.getBoundingClientRect()
                    if (rect.bottom > result.bottom) {
                        result.bottom = rect.bottom
                    }

                    return result
                }, {
                    top: Timetable.getOffsetFor("8:00"),
                    bottom: Timetable.getOffsetFor("20:00")
                })

            const content = this.viewContent
            content.style.height = (rect.bottom - rect.top) + "px"
            content.scrollTop = rect.top

            html2canvas(this.ref, {
                height: rect.bottom - rect.top
            })
                .then(canvas => {
                    this.setState({screenshotFlash: true}, () => {
                        setTimeout(() => {
                            this.props.saveScreenshot(canvas)
                            this.setState({isDuringScreenshot: false, screenshotFlash: false})
                            if (callback) callback()
                        }, 1000)
                    })
                })
        })
    }

    render() {
        return (
            <div
                className={"erebor-week-view " +
                (this.props.isExtendable ? "erebor-extendable-view " : "") +
                (this.state.isDuringScreenshot ? "erebor-screenshot-view " : "") +
                (this.state.screenshotFlash ? "is-flash" : "")
                }
                ref={ref => this.ref = ref}>
                <div className="erebor-week-view-title">
                    <HoursTitle/>
                    {this.weekdays()}
                </div>
                <div className="erebor-week-view-content" ref={viewContent => {
                    this.viewContent = viewContent
                }}>
                    <HoursColumn/>
                    {this.hourSeparators()}
                    {this.currentHourLine()}
                    {this.weekdayColumns()}
                </div>
            </div>
        )
    }

    weekdays = () =>
        new Array(this.props.display).fill(0).map((_, index) => {
            const today = new Date()
            const currentDay = new Date(this.props.startOfWeek.getTime())
            currentDay.setUTCDate(currentDay.getUTCDate() + index)
            const dayOfWeek = DateUtils.getDayOfWeek(currentDay)
            return <WeekdayTitle
                dayLocalized={this.state.weekdays[dayOfWeek]}
                dayOrdinal={dayOfWeek}
                dayOfMonth={currentDay.getUTCDate()}
                isToday={DateUtils.datesEqual(today, currentDay)}
                key={"weekday-title-" + currentDay.getTime()}
            />
        })

    hourSeparators = () =>
        new Array(24).fill(0).map((_, index) => {
            return <div className="erebor-hour-separator"
                        key={"erebor-hour-separator-" + index}
                        style={{"top": Week.WEEK_CONTENT_OFFSET + Timetable.getOffsetFor(`${index}:00`) + "px"}}
            />
        })

    currentHourLine = () => {
        const time = `${this.state.now.getHours()}:${this.state.now.getMinutes()}`
        return <div
            className="erebor-hour-line"
            style={{"top": Week.WEEK_CONTENT_OFFSET + Timetable.getOffsetFor(time) + "px"}}
        />
    }

    weekdayColumns = () =>
        new Array(this.props.display).fill(0).map((_, index) => {
            const currentDay = new Date(this.props.startOfWeek.getTime())
            currentDay.setUTCDate(currentDay.getUTCDate() + index)
            const dayOfWeek = DateUtils.getDayOfWeek(currentDay)
            const timetable = Timetable.filterByDate(Timetable.filterDayOfWeek(dayOfWeek + 1, this.props.timetable), this.props.startOfWeek)
            return <WeekdayColumn
                key={"weekday-column-" + index}
                dayOfWeek={dayOfWeek}
                timetable={timetable}
                clickedId={this.props.isEditable ? null : this.state.clickedId}
                toggleClicked={this.toggleClicked}
                isEditable={this.props.isEditable}
                customTimetable={this.props.customTimetable}
            />
        })

    toggleClicked = (id) => {
        if (this.props.isEditable) {
            this.props.toggleCustom(id)
            this.setState({clickedId: null})
        } else {
            if (this.state.clickedId === id) {
                this.setState({clickedId: null})
            } else {
                this.setState({clickedId: id})
            }
        }
    }
}

export default Week