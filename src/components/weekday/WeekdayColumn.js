import React, { Component } from 'react'
import './css/WeekdayColumn.css'

class WeekdayColumn extends Component {
    render() {
        return (
            <div
                className={"erebor-weekday-column " + (this.props.dayOfWeek >= 5 ? "is-weekend" : "")}
            />
        )
    }
}

export default WeekdayColumn