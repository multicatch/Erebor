import React, {Component} from 'react'

import './css/OptionsBar.css'
import {faCheck, faCopy, faImage, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class OptionsBar extends Component {

    state = {
        search: '',
        groups: {},
        manualMode: 0,
        importantVisible: true,
        extend: false,
        copied: false
    }

    setState = (state, callback) => {
        super.setState(state, () => {
            this.props.setQuery(this.state)
            if (callback) callback()
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.query) {
            super.setState(nextProps.query)
        }
    }

    componentWillMount = () => {
        this.setState(this.props.query, () => {
            this.setState({copied: false})
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
                        className="erebor-filter-dropdown erebor-dropdown-select"
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
        this.setState({groups})
    }

    render() {
        const groupSelectors = this.groupSelectors()
        const isManualOff = this.state.manualMode === 0
        const isManualOn = this.state.manualMode === 1
        const isManualEdit = this.state.manualMode === 2
        const isImportantVisible = this.state.importantVisible
        const isExtendingHoverEnabled = this.state.extend

        return (
            <div className={"erebor-options-bar-wrapper " + (this.props.shown ? "is-shown" : "")}>
                <div className="erebor-options-section">
                    <input type="text" placeholder="Wyszukaj"
                           value={this.state.search}
                           onChange={event => this.setState({search: event.target.value})}
                           className="erebor-search"/>
                    {(this.state.search ? <FontAwesomeIcon className="erebor-delete-search" icon={faTimesCircle}
                                                           onClick={() => this.setState({search: ''})}/> : "")}
                </div>

                <div className={"erebor-options-section " + (groupSelectors.length < 1 ? "is-hidden" : "")}>
                    <div className="erebor-options-section-title">Grupy zajęciowe</div>
                    {groupSelectors}
                </div>

                <div className={"erebor-options-section"}>
                    <div className="erebor-options-section-title">Konfiguracja zajęć</div>
                    <div className={"erebor-filter-switch"}>
                        <div className={"erebor-section-label"}>Własny plan</div>
                        <div className={"erebor-button-group erebor-button-group--gray"}>
                            <div
                                className={"erebor-button " + (isManualOn ? "is-selected" : "")}
                                onClick={() => this.setState({manualMode: 1})}
                            >ON
                            </div>
                            <div
                                className={"erebor-button " + (isManualEdit ? "is-selected" : "")}
                                onClick={() => this.setState({manualMode: 2})}
                            >EDIT
                            </div>
                            <div
                                className={"erebor-button " + (isManualOff ? "is-selected" : "")}
                                onClick={() => this.setState({manualMode: 0})}
                            >OFF
                            </div>
                        </div>
                    </div>
                    <div className={"erebor-filter-switch " + (isManualOn ? "" : "is-grayed-out")}>
                        <div className={"erebor-section-label"}>Ogłoszenia</div>
                        <div className={"erebor-button-group erebor-button-group--gray"}>
                            <div
                                className={"erebor-button " + (isImportantVisible ? "is-selected" : "")}
                                onClick={() => isManualOn && this.setState({importantVisible: true})}
                            >ON
                            </div>
                            <div
                                className={"erebor-button " + (!isImportantVisible ? "is-selected" : "")}
                                onClick={() => isManualOn && this.setState({importantVisible: false})}
                            >OFF
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"erebor-options-section"}>
                    <div className="erebor-options-section-title">Widok</div>

                    <div className={"erebor-filter-switch"}>
                        <div className={"erebor-section-label"}>Rozwijanie</div>
                        <div className={"erebor-button-group erebor-button-group--gray"}>
                            <div
                                className={"erebor-button " + (isExtendingHoverEnabled ? "is-selected" : "")}
                                onClick={() => this.setState({extend: true})}
                            >ON
                            </div>
                            <div
                                className={"erebor-button " + (!isExtendingHoverEnabled ? "is-selected" : "")}
                                onClick={() => this.setState({extend: false})}
                            >OFF
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"erebor-options-section"}>
                    <div className="erebor-options-section-title">Udostępnianie</div>
                    <CopyToClipboard
                        text={window.location}
                        onCopy={this.onSuccessfulCopy}
                    >
                        <div
                            className={"erebor-button erebor-button--gray erebor-button--center"}
                        >{this.state.copied ? <span><FontAwesomeIcon icon={faCheck}/> Skopiowano</span> : <span><FontAwesomeIcon icon={faCopy}/> Kopiuj link</span>}
                        </div>
                    </CopyToClipboard>
                    <div
                        className={"erebor-button erebor-button--gray erebor-button--center"}
                        onClick={this.props.createScreenshot}
                    ><FontAwesomeIcon icon={faImage}/> Zapisz jako png
                    </div>
                </div>
            </div>
        )
    }

    onSuccessfulCopy = () => {
        this.setState({copied: true}, () => {
            setTimeout(() => {
                this.setState({copied: false})
            }, 1000)
        })
    }
}

export default OptionsBar