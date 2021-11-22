import React, {Component} from 'react'
import './css/WeekdayColumn.css'
import Timetable from '../../utils/Timetable'
import WeekdayItem from './WeekdayItem'

class WeekdayColumn extends Component {

    parseTimetable = () => this.props.timetable.map(item => {
        return {
            id: item.id,
            startTime: item.time.start_time,
            endTime: item.time.end_time,
            duration: item.time.duration,
            room: item.room,
            name: item.name,
            teacher: item.teacher,
            type: item.group.symbol,
            groupId: item.group.number,
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
                isEditable={this.props.isEditable}
                isEnabledInCustom={this.props.customTimetable.indexOf(item.id) >= 0}
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