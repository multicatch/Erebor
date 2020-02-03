import React, {Component} from 'react'
import './App.css'
import './common-ui.css'
import Toolbar from './components/Toolbar'
import CalendarHeader from './components/CalendarHeader';
import Week from "./components/Week";
import DateUtils from './utils/DateUtils'
import Timetable from './utils/Timetable'
import GroupSelector from './components/group/GroupSelector'
import Groups from './utils/Groups'
import FilterBar from './components/FilterBar'
import TimetableFilter from './utils/TimetableFilter'
import SettingsRepository from './utils/SettingsRepository'

class App extends Component {
    defaultSettings = {
        startOfWeek: new Date(),
        groups: [],
        timeProgression: 0,
        selectedGroup: 0,
        timetable: [],
        groupSelectorShown: false,
        filterShown: false,
        query: {},
        customTimetable: []
    }

    componentWillMount = () => {
        const defaultSettings = this.defaultSettings
        const state = SettingsRepository.retrieve(defaultSettings)
        state.startOfWeek = defaultSettings.startOfWeek
        this.setState(state, () => {
            this.updateWeek()
            this.updateTimetable(this.state.group)
        })
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateWeek);
        Groups.fetchGroups().then(groups => {
            this.setState({
                groups: groups
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWeek);
    }

    setState = (state, callback) => {
        super.setState(state, () => {
            SettingsRepository.save(this.state)
            if (callback) callback()
        })
    }

    updateWeek = () => {
        const startOfWeek = this.state.startOfWeek
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() - DateUtils.getDayOfWeek(startOfWeek))
        this.setState({timeProgression: this.timeProgression(), startOfWeek})
    }

    render() {
        return (
            <div className={"erebor-app " + (this.state.filterShown ? "filter-shown" : "")}>
                <Toolbar
                    updateTimetable={this.updateTimetable}
                    selectedGroup={this.state.selectedGroup}
                    selectGroup={this.selectGroup}
                    groups={this.state.groups}
                    toggleGroupSelector={this.toggleGroupSelector}
                    toggleFilter={this.toggleFilter}
                />
                <GroupSelector
                    selectedGroup={this.state.selectedGroup}
                    selectGroup={this.selectGroup}
                    groups={this.state.groups}
                    show={this.state.groupSelectorShown}
                />
                <FilterBar
                    shown={this.state.filterShown}
                    setQuery={this.setQuery}
                    query={this.state.query}
                    groups={TimetableFilter.groupsOf(this.state.timetable)}
                />
                <CalendarHeader
                    startOfWeek={this.state.startOfWeek}
                    advanceDate={this.advanceDate}
                    decreaseDate={this.decreaseDate}
                    resetDate={this.resetDate}
                />
                <Week
                    startOfWeek={this.state.startOfWeek}
                    display={this.state.timeProgression}
                    timetable={TimetableFilter.filter(this.state.timetable, this.state.query, this.state.customTimetable)}
                    isEditable={this.state.query.manualMode === 2}
                    toggleCustom={this.toggleCustom}
                    customTimetable={this.state.customTimetable}
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
            this.setState({timetable})
        })
    }

    selectGroup = (group) => {
        this.setState({selectedGroup: group}, () => {
            this.updateTimetable(group)
        })
    }

    toggleGroupSelector = () => {
        this.setState({groupSelectorShown: !this.state.groupSelectorShown})
    }

    toggleFilter = () => {
        this.setState({filterShown: !this.state.filterShown})
    }

    setQuery = (query) => {
        this.setState({query})
    }

    toggleCustom = (id) => {
        let customTimetable = this.state.customTimetable
        if (customTimetable.indexOf(id) < 0) {
            customTimetable.push(id)
        } else {
            customTimetable = customTimetable.filter(timetableId => timetableId !== id)
        }

        this.setState({ customTimetable })
    }
}

export default App
