import React, {Component} from 'react'

import './css/FilterBar.css'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class FilterBar extends Component {

    state = {
        search: '',
        groups: {},
        manualMode: 0
    }

    setState = (state, callback) => {
        super.setState(state, () => {
            this.props.setQuery(this.state)
            if (callback) callback()
        })
    }

    groupSelectors = () => {
        return Object.keys(this.props.groups)
            .filter(key => this.props.groups[key].length > 1)
            .map(key => {
                const options = this.props.groups[key].map(item => <option key={`${key}${item}`}
                                                                           value={item}>{key}{item}</option>)
                return (
                    <select
                        className="erebor-filter-dropdown"
                        value={this.state.groups[key]}
                        key={key}
                        onChange={(event) => this.setGroupFilter(key, event.target.value)}
                    >
                        <option key={key} value={""}> - Wszystkie {key} -</option>
                        {options}
                    </select>
                )
            })
    }

    setGroupFilter = (key, group) => {
        const groups = this.state.groups
        groups[key] = group
        this.setState({ groups })
    }

    render() {
        const groupSelectors = this.groupSelectors()
        const isManualOff = this.state.manualMode === 0
        const isManualOn = this.state.manualMode === 1
        const isManualEdit = this.state.manualMode === 2

        return (
            <div className={"erebor-filter-bar-wrapper " + (this.props.shown ? "is-shown" : "")}>
                <div className="erebor-filter-section">
                    <input type="text" placeholder="Wyszukaj"
                           value={this.state.search}
                           onChange={event => this.setState({search: event.target.value})}
                           className="erebor-search"/>
                    {(this.state.search ? <FontAwesomeIcon className="erebor-delete-search" icon={faTimesCircle}
                                                           onClick={() => this.setState({search: ''})}/> : "")}
                </div>

                <div className={"erebor-filter-section erebor-filter-switch"}>
                    <div className={"erebor-section-label"}>Ręcznie</div>
                    <div className={"erebor-button-group erebor-button-group--gray"}>
                        <div
                            className={"erebor-button " + (isManualOn ? "is-selected" : "")}
                            onClick={() => this.setState({ manualMode: 1 })}
                        >ON</div>
                        <div
                            className={"erebor-button " + (isManualEdit ? "is-selected" : "")}
                            onClick={() => this.setState({ manualMode: 2 })}
                        >EDIT</div>
                        <div
                            className={"erebor-button " + (isManualOff ? "is-selected" : "")}
                            onClick={() => this.setState({ manualMode: 0 })}
                        >OFF</div>
                    </div>
                </div>

                <div className={"erebor-filter-section " + (groupSelectors.length < 1 ? "is-hidden" : "")}>
                    <div className="erebor-filter-section-title">Grupy zajęciowe</div>
                    {groupSelectors}
                </div>
            </div>
        )
    }
}

export default FilterBar