import React, {Component} from 'react'
import './css/GroupSelector.css'
import Groups from '../../utils/Groups'
import Years from './Years'

class GroupSelector extends Component {

    selectorRef = React.createRef()

    render() {
        const showState = (this.props.show ? "is-shown" : "is-hidden")
        const groupByType = Groups.groupByType(this.props.groups)
        const groupKeys = Object.keys(groupByType)
        groupKeys.sort()

        return (
            <div className={"erebor-group-selector-wrapper " + showState} onClick={this.toggleSelector}>
                <div className={"erebor-group-selector-content"} ref={this.selectorRef}>
                    <select
                        className={"erebor-group-selector-select erebor-dropdown-select"}
                        onChange={this.selectGroup}
                        value={this.selectedKey(groupByType)}
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
        const groupId = Groups.groupIdFrom(event.target.value, this.props.groups)
        this.props.selectGroup(groupId)
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