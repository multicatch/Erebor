import React, {Component} from 'react'
import DateUtils from '../../utils/DateUtils'
import './css/HoursColumn.css'

class HoursColumn extends Component {
    render = () => {
        return (
            <div className="erebor-hours-column">
                {this.hours()}
            </div>
        )
    }

    hours = () => new Array(24).fill(0).map(
        (_, index) =>
            <div className="erebor-hour-cell" key={"erebor-hours-" + index}>
                {DateUtils.formatHours(index)}:00
            </div>
        )
}


export default HoursColumn