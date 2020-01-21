import React, {Component} from 'react'
import './css/WeekdayItem.css'
import Timetable from '../../utils/Timetable'

class WeekdayItem extends Component {

    render() {
        return (
            <div className={"erebor-weekday-item erebor-weekday-item is-blue"}
                 style={{
                     "height": Timetable.getOffsetFor(this.props.item.duration) + "px",
                     "top": Timetable.getOffsetFor(this.props.item.startTime) + "px"
                 }}>
                <div className="erebor-weekday-item-title">
                    {this.props.item.name}
                </div>
            </div>
        )
    }
}

export default WeekdayItem