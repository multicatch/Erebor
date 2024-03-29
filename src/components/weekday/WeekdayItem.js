import React, {Component} from 'react'
import './css/WeekdayItem.css'
import Timetable from '../../utils/Timetable'
import DateUtils from '../../utils/DateUtils'
import {faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class WeekdayItem extends Component {

    render() {
        const width = (1.0 / this.props.item.concurrent.count * 100) * this.props.item.concurrent.width
        const left = width * this.props.item.concurrent.index
        const isClicked = (this.props.clickedId === this.props.item.id ? "is-active" : "")
        const isEditable = (this.props.isEditable ? "is-editable" : "")
        const isEnabledInCustom = (this.props.isEnabledInCustom ? "is-custom" : "")
        const roomWords = this.props.item.room.split(" ")
        const roomWordsLead = roomWords[0]
        roomWords.shift()
        const height = DateUtils.parseDuration(this.props.item.duration) * 100

        return (
            <div className={"erebor-weekday-item-wrapper " + this.typeClassOf(this.props.item.type) + " " + isClicked + " " + isEditable + " " + isEnabledInCustom}
                 style={{
                     "height": Timetable.HOUR_HEIGHT + "px",
                     "top": Timetable.getOffsetFor(this.props.item.startTime) + "px"
                 }}>
                <div className={"erebor-weekday-item " + (height < 100 ? "is-small" : "") + " " + (height < 75 ? "is-smaller" : "")}
                     style={{
                         "height": "calc(" + height + "% - 1px)",
                         "width": width + "%",
                         "marginLeft": left + "%"
                     }}
                     onClick={() => this.props.toggleClicked(this.props.item.id)}
                >
                    <div className="erebor-weekday-item-title ">
                        <span className={"erebor-weekday-item-custom-check"}>{(this.props.isEnabledInCustom ? <FontAwesomeIcon icon={faCheckSquare}/> : <FontAwesomeIcon icon={faSquare}/>)}</span>
                        {this.props.item.name}
                    </div>

                    <div className="erebor-weekday-item-duration">
                        {this.props.item.startTime}-{this.props.item.endTime}
                    </div>

                    {this.subgroupIdOf(this.props.item)}

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

    subgroupIdOf = (item) => {
        if (item.groupId) {
            return (<div className={"erebor-weekday-item-subgroup-id"}>{item.type}{item.groupId}</div>)
        } else {
            return ""
        }
    }

    typeClassOf = (type) => {
        if (type === "WY") {
            return "is-lecture"
        }

        if (type === "SM" || type === "KW") {
            return "is-seminar"
        }

        if (type === "LB") {
            return "is-laboratory"
        }

        return "is-default"
    }
}

export default WeekdayItem