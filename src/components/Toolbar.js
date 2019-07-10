import React, { Component } from 'react'
import './css/Toolbar.css'

class Toolbar extends Component {

    state = {
        title: 'Informatyka',
        years: [1, 2, 3, 4],
        selectedYear: 2
    }

    selectYear = (selectedYear) => this.setState({selectedYear})

    years = () => this.state.years.map(year =>
        <div
            className={"erebor-toolbar-years-button erebor-button " + (year === this.state.selectedYear ? "is-selected" : "")}
            onClick={() => this.selectYear(year)}
            key={`${this.title}-${year}-toggle`}
        >
            {year}
        </div>
    )

    render() {
        return (
            <div className="erebor-toolbar">
                <div className="erebor-toolbar-content">
                    <div className="erebor-toolbar-button erebor-button erebor-button--gray">
                        Filtrowanie
                    </div>
                    <div className="erebor-toolbar-title is-stretched">
                        {this.state.title} <span className="erebor-toolbar-title-year">{this.state.selectedYear}</span>
                    </div>
                    <div className="erebor-toolbar-years erebor-button-group erebor-button-group--gray">
                        {this.years()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolbar