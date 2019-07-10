import React, { Component } from 'react'
import './css/CalendarHeader.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

class CalendarHeader extends Component {

    state = {
        month: 'lipiec',
        year: '2019'
    }

    render() {
        return (
            <div className="erebor-calendar-header">
                <div className="erebor-month-wrapper">
                    <span className="erebor-month">{this.state.month}</span> {this.state.year}
                </div>
                <div className="erebor-week-toggle">
                    <div className="erebor-button-group erebor-button-group--gray">
                        <div className="erebor-button erebor-week-back"><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="erebor-button erebor-week-today-icon"><FontAwesomeIcon icon={faCalendarDay}/></div>
                        <div className="erebor-button erebor-week-today-text">Dzisiaj</div>
                        <div className="erebor-button erebor-week-forward"><FontAwesomeIcon icon={faChevronRight} /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CalendarHeader