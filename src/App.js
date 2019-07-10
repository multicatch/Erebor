import React, { Component } from 'react'
import './App.css'
import './common-ui.css'
import Toolbar from './components/Toolbar'

class App extends Component {
    render() {
        return (
            <div className="erebor-app">
                <Toolbar/>
            </div>
        )
    }
}

export default App
