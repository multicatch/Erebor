import React, {Component} from 'react'
import './css/Week.css'
import HoursTitle from "./hours/HoursTitle"
import WeekdayTitle from "./weekday/WeekdayTitle"
import DateUtils from "../utils/DateUtils"
import HoursColumn from './hours/HoursColumn'

class Week extends Component {

    static WEEK_CONTENT_OFFSET = 12
    static HOUR_HEIGHT = 64

    state = {
        weekdays: ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'nd.'],
        now: new Date(),
        updateLineInterval: null
    }

    componentDidMount = () => {
        const height = this.viewContent.scrollHeight
        this.viewContent.scrollTop = 8 * height / 24

        this.setState({ updateLineInterval: setInterval(this.updateHour, 60000) })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.updateLineInterval)
    }

    updateHour = () => {
        this.setState({ now: new Date() })
    }

    render() {
        return (
            <div className="erebor-week-view">
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
            return <div className="erebor-hour-separator" key={"erebor-hour-separator-" + index}
                        style={{"top": Week.WEEK_CONTENT_OFFSET + index * Week.HOUR_HEIGHT + "px"}}/>
        })

    currentHourLine = () => {
        const top = Week.HOUR_HEIGHT * (this.state.now.getHours() + this.state.now.getMinutes() / 60)
        return (<div className="erebor-hour-line" style={{"top": Week.WEEK_CONTENT_OFFSET + top + "px"}} />)
    }

}

export default Week