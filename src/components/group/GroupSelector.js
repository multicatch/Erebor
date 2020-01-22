import React, {Component} from 'react'
import './css/GroupSelector.css'
import Groups from '../../utils/Groups'
import Years from './Years'

class GroupSelector extends Component {

    render() {
        const showState = (this.props.show ? "is-shown" : "is-hidden")


        const groupByType = Groups.groupByType(this.props.groups)
        const groupKeys = Object.keys(groupByType)
        groupKeys.sort()

        return (
            <div className={"erebor-group-selector-wrapper " + showState}>
                <div className={"erebor-group-selector-content"}>
                    <select
                        className={"erebor-group-selector-select"}
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
        console.log(selectById)
        if (selectById && selectById.length > 0) {
            return selectById[0].name
        } else {
            return undefined
        }
    }

    selectGroup = (event) => {
        const groupId = Groups.groupIdFrom(event.target.value, this.props.groups)
        console.log(groupId)
        this.props.selectGroup(groupId)
    }
}

export default GroupSelector