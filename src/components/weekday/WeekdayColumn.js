import React, {Component} from 'react'
import './css/WeekdayColumn.css'
import Timetable from '../../utils/Timetable'
import WeekdayItem from './WeekdayItem'

class WeekdayColumn extends Component {

    parseTimetable = () => this.props.timetable.map(item => {
        return {
            id: item.id,
            startTime: item.event_array[0].start_time,
            duration: item.event_array[0].length,
            room: item.event_array[0].room,
            name: item.subject,
            teacher: item.teacher_array[0].name,
            type: item.type.shortcut
        }
    })

    render() {
        const timetable = this.parseTimetable().map(item => <WeekdayItem item={item}/>)
        const isWeekend = (this.props.dayOfWeek >= 5 ? "is-weekend" : "")
        const isFirst = (this.props.dayOfWeek <= 0 ? "is-first" : "")

        return (
            <div
                className={"erebor-weekday-column " + isWeekend + " " + isFirst}
            >
                {timetable}
            </div>
        )
    }
}

export default WeekdayColumn