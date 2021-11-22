import React, {Component} from 'react'
import './css/Toolbar.css'
import Groups from '../utils/Groups'
import Years from './group/Years'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

class Toolbar extends Component {

    render() {
        const selectedYear = this.selectedGroupYears().filter(group =>
            group.id === this.props.selectedGroup || group.id === "" + this.props.selectedGroup
        )[0]

        return (
            <div className="erebor-toolbar">
                <div className="erebor-toolbar-content">
                    <div className="erebor-toolbar-button erebor-button erebor-button--gray"
                        onClick={this.props.toggleFilter}>
                        Opcje
                    </div>
                    <div className="erebor-toolbar-title is-stretched" onClick={this.props.toggleGroupSelector}>
                        <span className="erebor-toolbar-title-content">{selectedYear ? selectedYear.name : "Wybierz kierunek"}</span>
                        <span className="erebor-toolbar-title-year">{selectedYear ? selectedYear.year : ""}</span>
                        <span className="erebor-toolbar-title-ellipsis"><FontAwesomeIcon icon={faBars} /></span>
                    </div>
                    <div className="erebor-toolbar-years">
                        <Years
                            groups={this.props.groups}
                            selectedGroup={this.props.selectedGroup}
                            selectGroup={this.props.selectGroup}
                        />
                    </div>
                </div>
            </div>
        )
    }

    selectedGroupYears = () => {
        return Groups.selectById(this.props.selectedGroup, this.props.groups)
    }
}

export default Toolbar