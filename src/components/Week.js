import React, {Component} from 'react'
import './css/Week.css'
import HoursTitle from "./hours/HoursTitle"
import WeekdayTitle from "./weekday/WeekdayTitle"
import DateUtils from "../utils/DateUtils"

class Week extends Component {

    state = {
        weekdays: ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'nd.']
    }

    render() {
        return (
            <div className="erebor-week-view">
                <div className="erebor-week-view-title">
                    <HoursTitle/>
                    {this.weekdays()}
                </div>
                <div className="erebor-week-view-content">
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

}

export default Week