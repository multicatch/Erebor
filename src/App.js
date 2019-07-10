import React, { Component } from 'react'
import './App.css'
import './common-ui.css'
import Toolbar from './components/Toolbar'
import CalendarHeader from './components/CalendarHeader';

class App extends Component {
    render() {
        return (
            <div className="erebor-app">
                <Toolbar/>
                <CalendarHeader/>
            </div>
        )
    }
}

export default App
