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
import Url from './utils/Url'

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

    initialized = false

    componentWillMount = () => {
        const defaultSettings = this.defaultSettings
        const retrievedSettings = SettingsRepository.retrieve(defaultSettings)
        const state = Url.parse(retrievedSettings, window.location.hash)
        state.startOfWeek = defaultSettings.startOfWeek
        this.setState(state, () => {
            this.updateWeek()
            this.updateTimetable(this.state.selectedGroup)
        })
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateWeek);
        Groups.fetchGroups().then(groups => {
            this.setState({
                groups: groups
            })
        })
        window.addEventListener("hashchange", this.updateStateOnHashChange, false)
        this.initialized = true
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWeek)
        window.removeEventListener("hashchange", this.updateStateOnHashChange, false)
        this.initialized = false
    }

    setState = (state, callback, isHashChange = false) => {
        super.setState(state, () => {
            SettingsRepository.save(this.state)
            if (this.initialized && !isHashChange) {
                window.location.hash = Url.stringify(this.state)
            }
            if (callback) {
                callback()
            }
        })
    }

    updateStateOnHashChange = () => {
        this.setState(Url.parse(this.state, window.location.hash), () => {
            this.updateTimetable(this.state.selectedGroup)
        }, true)
    }

    updateWeek = () => {
        const startOfWeek = this.state.startOfWeek
        const timeProgression = this.timeProgression()
        if (timeProgression === 7) {
            startOfWeek.setUTCDate(startOfWeek.getUTCDate() - DateUtils.getDayOfWeek(startOfWeek))
        }
        this.setState({timeProgression, startOfWeek})
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
                    customTimetable={this.state.customTimetable || []}
                    isExtendable={this.state.query.extend}
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
        if (window.innerWidth <= 1024) {
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
