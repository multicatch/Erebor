import React, {Component} from 'react'
import './App.css'
import './common-ui.css'
import Toolbar from './components/Toolbar'
import CalendarHeader from './components/CalendarHeader';
import Week from "./components/Week";
import DateUtils from './utils/DateUtils'
import Timetable from './utils/Timetable'

class App extends Component {
    state = {
        startOfWeek: new Date(),
        timeProgression: 0,
        timetable: []
    }

    componentWillMount = () => {
        this.updateWeek()
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateWeek);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWeek);
    }

    updateWeek = () => {
        const startOfWeek = this.state.startOfWeek
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() - DateUtils.getDayOfWeek(startOfWeek))
        this.setState({timeProgression: this.timeProgression(), startOfWeek})
    }

    render() {
        return (
            <div className="erebor-app">
                <Toolbar
                    updateTimetable={this.updateTimetable}
                />
                <CalendarHeader
                    advanceDate={this.advanceDate}
                    decreaseDate={this.decreaseDate}
                    resetDate={this.resetDate}
                />
                <Week
                    startOfWeek={this.state.startOfWeek}
                    display={this.state.timeProgression}
                    timetable={this.state.timetable}
                />
            </div>
        )
    }

    resetDate = () => {
        this.setState({startOfWeek: new Date()}, () => {
            this.updateWeek()
        })
    }

    advanceDate = () => {
        const startOfWeek = this.state.startOfWeek
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() + this.timeProgression())
        this.setState({startOfWeek})
    }

    decreaseDate = () => {
        const startOfWeek = this.state.startOfWeek
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() - this.timeProgression())
        this.setState({startOfWeek})
    }

    timeProgression = () => {
        if (window.innerWidth <= 768) {
            return 1;
        }
        return 7;
    }

    updateTimetable = (group) => {
        Timetable.fetchTimetable(group).then(timetable => {
            console.log(timetable)
            this.setState({timetable})
        })
    }
}

export default App
