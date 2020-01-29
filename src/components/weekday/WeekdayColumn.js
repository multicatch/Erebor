import React, {Component} from 'react'
import './css/WeekdayColumn.css'
import Timetable from '../../utils/Timetable'
import WeekdayItem from './WeekdayItem'

class WeekdayColumn extends Component {

    parseTimetable = () => this.props.timetable.map(item => {
        return {
            id: item.id,
            startTime: item.event_array[0].start_time,
            endTime: item.event_array[0].end_time,
            duration: item.event_array[0].length,
            room: item.event_array[0].room,
            name: item.subject,
            teacher: item.teacher_array[0].name,
            type: item.type.shortcut,
            groupId: item.students_array[0].groups && item.students_array[0].groups !== "1" ? item.students_array[0].group : undefined,
            concurrent: Timetable.concurrentDataOf(item, this.props.timetable),
        }
    })

    render() {
        const timetable = this.parseTimetable().map(item =>
            <WeekdayItem
                key={"weekday-item-" + item.id}
                item={item}
                clickedId={this.props.clickedId}
                toggleClicked={this.props.toggleClicked}
            />)
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