import React, {Component} from 'react'

import './css/FilterBar.css'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class FilterBar extends Component {

    state = {
        search: ''
    }

    setState(state, callback) {
        this.props.setQuery(state)
        super.setState(state, callback)
    }

    render() {
        return (
            <div className={"erebor-filter-bar-wrapper " + (this.props.shown ? "is-shown" : "")}>
                <div className="erebor-filter-section">
                    <input type="text" placeholder="Wyszukaj"
                           value={this.state.search}
                           onChange={event => this.setState({ search: event.target.value })}
                           className="erebor-search"/>
                    {(this.state.search ? <FontAwesomeIcon className="erebor-delete-search" icon={faTimesCircle} onClick={() => this.setState({ search: '' })} /> : "")}
                </div>

                <div className="erebor-filter-section">
                    <div className="erebor-filter-section-title">Grupy zajęciowe</div>
                </div>
            </div>
        )
    }
}

export default FilterBar