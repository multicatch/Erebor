import React, {Component} from 'react'
import './css/WeekdayItem.css'
import Timetable from '../../utils/Timetable'

class WeekdayItem extends Component {

    render() {
        const width = (1.0 / this.props.item.concurrent.count * 100)
        const left = width * this.props.item.concurrent.index
        const isClicked = (this.props.clickedId === this.props.item.id ? "is-active" : "")
        const roomWords = this.props.item.room.split(" ")
        const roomWordsLead = roomWords[0]
        roomWords.shift()

        return (
            <div className={"erebor-weekday-item-wrapper is-blue " + isClicked}
                 style={{
                     "height": Timetable.HOUR_HEIGHT + "px",
                     "top": Timetable.getOffsetFor(this.props.item.startTime) + "px"
                 }}>
                <div className={"erebor-weekday-item"}
                     style={{
                         "height": "calc(" + Timetable.parseDuration(this.props.item.duration) * 100 + "% - 1px)",
                         "width": width + "%",
                         "marginLeft": left + "%"
                     }}
                     onClick={() => this.props.toggleClicked(this.props.item.id)}
                >
                    <div className="erebor-weekday-item-title ">
                        {this.props.item.name}
                    </div>

                    <div className="erebor-weekday-item-duration">
                        {this.props.item.startTime}-{this.props.item.endTime}
                    </div>

                    <div className="erebor-weekday-item-footer">
                        <div className="erebor-weekday-item-teacher">
                            {this.props.item.teacher}
                        </div>

                        <div className="erebor-weekday-item-room">
                            <span className="erebor-weekday-item-room-lead">{roomWordsLead}</span>
                            <span className="erebor-weekday-item-room-other">{roomWords.join(" ")}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeekdayItem