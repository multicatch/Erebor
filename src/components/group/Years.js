import React, {Component} from 'react'
import './css/Years.css'
import Groups from '../../utils/Groups'

class Years extends Component {

    years = () => {
        const groupYears = this.selectedGroupYears()

        if (groupYears && groupYears.length > 0) {
            groupYears.sort((a, b) => a.year - b.year)

            return groupYears.map(year =>
                <div
                    className={"erebor-toolbar-years-button erebor-button " + (year.id === this.props.selectedGroup ? "is-selected" : "")}
                    onClick={() => this.props.selectGroup(year.id)}
                    key={`erebor-year-${year.id}-toggle`}
                >
                    {year.year}
                </div>
            )
        } else {
            return []
        }
    }

    render() {
        return (
            <div className={"erebor-years-picker erebor-button-group erebor-button-group--gray"}>
                {this.years()}
            </div>
        )
    }

    selectedGroupYears = () => {
        return Groups.selectById(this.props.selectedGroup, this.props.groups)
    }
}

export default Years