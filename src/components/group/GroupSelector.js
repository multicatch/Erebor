import React, {Component} from 'react'
import './css/GroupSelector.css'
import Groups from '../../utils/Groups'
import Years from './Years'
import ReactGA from 'react-ga'

class GroupSelector extends Component {

    selectorRef = React.createRef()

    render() {
        const showState = (this.props.show ? "is-shown" : "is-hidden")
        const groupKeys = Object.keys(this.props.groups)
        groupKeys.sort()

        return (
            <div className={"erebor-group-selector-wrapper " + showState} onClick={this.toggleSelector}>
                <div className={"erebor-group-selector-content"} ref={this.selectorRef}>
                    <select
                        className={"erebor-group-selector-select erebor-dropdown-select"}
                        onChange={this.selectGroup}
                        value={this.selectedKey(this.props.groups)}
                    >
                        {groupKeys.map((key, index) =>
                            <option
                                value={key}
                                key={"erebor-group-option-" + index}
                            >{key}</option>)}
                    </select>
                    <Years
                        groups={this.props.groups}
                        selectedGroup={this.props.selectedGroup}
                        selectGroup={this.props.selectGroup}
                    />
                </div>
            </div>
        )
    }

    selectedKey = (groupByType) => {
        const selectById = Groups.selectById(this.props.selectedGroup, groupByType)
        if (selectById && selectById.length > 0) {
            return selectById[0].name
        } else {
            return undefined
        }
    }

    selectGroup = (event) => {
        const groupId = this.groupIdFrom(event.target.value, this.props.groups)
        ReactGA.ga('send', 'event', 'Timetable', 'select_group', event.target.value, groupId)
        this.props.selectGroup(groupId)
    }

    groupIdFrom = (name, groupByType) => {
        if (groupByType[name] && groupByType[name].length > 0) {
            groupByType[name].sort((a, b) => a.year - b.year)
            return groupByType[name][0].id
        } else {
            return 0
        }
    }


    toggleSelector = (event) => {
        if (this.selectorRef
            && this.selectorRef.current
            && !this.selectorRef.current.contains(event.target)
        ) {
            this.props.toggleGroupSelector()
        }
    }
}

export default GroupSelector