import React, { Component } from 'react'
import './css/WeekdayTitle.css'

class WeekdayTitle extends Component {
    render() {
        return (
            <div className={"erebor-weekday-title " + (this.props.dayOrdinal >= 5 ? "is-weekend" : "")}>
                {this.props.dayLocalized}, <span className={"erebor-weekday-day " + (this.props.isToday ? "is-today" : "")}>{this.props.dayOfMonth}</span>
            </div>
        )
    }
}

export default WeekdayTitle