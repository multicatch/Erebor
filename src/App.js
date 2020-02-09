import React, {Component} from 'react'
import './App.css'
import './common-ui.css'
import Toolbar from './components/Toolbar'
import CalendarHeader from './components/CalendarHeader';
import Week from "./components/Week";
import DateUtils from './utils/DateUtils'
import GroupSelector from './components/group/GroupSelector'
import Groups from './utils/Groups'
import OptionsBar from './components/OptionsBar'
import TimetableFilter from './utils/TimetableFilter'
import SettingsRepository from './utils/SettingsRepository'
import Url from './utils/Url'
import download from 'downloadjs'
import GroupsResource from './webservices/GroupsResource'
import TimetableResource from './webservices/TimetableResource'
import ReactGA from 'react-ga'

class App extends Component {
    defaultSettings = {
        startOfWeek: new Date(),
        groups: [],
        timeProgression: 0,
        selectedGroup: 0,
        timetable: [],
        groupSelectorShown: false,
        filterShown: false,
        query: [],
        customTimetable: [],
        isLoading: false
    }

    weekRef = React.createRef()
    initialized = false

    componentWillMount = () => {
        const defaultSettings = this.defaultSettings
        const retrievedSettings = SettingsRepository.retrieve(defaultSettings)
        const state = Url.parse(retrievedSettings, window.location.hash)
        state.startOfWeek = defaultSettings.startOfWeek
        state.isLoading = true
        this.setState(state, () => {
            this.updateWeek()
            this.updateTimetable(this.state.selectedGroup)
        })
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateWeek);
        GroupsResource.fetch().then(groups => {
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
                    toggleGroupSelector={this.toggleGroupSelector}
                />
                <OptionsBar
                    shown={this.state.filterShown}
                    setQuery={this.setQuery}
                    query={this.state.query[this.state.selectedGroup] || {}}
                    groups={TimetableFilter.groupsOf(this.state.timetable)}
                    createScreenshot={this.createScreenshot}
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
                    timetable={TimetableFilter.filter(this.state.timetable, this.state.query[this.state.selectedGroup] || {}, this.state.customTimetable[this.state.selectedGroup] || [])}
                    isEditable={this.state.query[this.state.selectedGroup] && this.state.query[this.state.selectedGroup].manualMode === 2}
                    toggleCustom={this.toggleCustom}
                    customTimetable={this.state.customTimetable[this.state.selectedGroup] || []}
                    isExtendable={this.state.query[this.state.selectedGroup] && this.state.query[this.state.selectedGroup].extend}
                    saveScreenshot={this.saveScreenshot}
                    isLoading={this.state.isLoading}
                    ref={this.weekRef}
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
        TimetableResource.fetch(group).then(timetable => {
            this.setState({timetable, isLoading: false})
        })
    }

    selectGroup = (group) => {
        this.setState({selectedGroup: group, isLoading: true}, () => {
            this.updateTimetable(group)
        })
    }

    toggleGroupSelector = () => {
        this.setState({groupSelectorShown: !this.state.groupSelectorShown})
    }

    toggleFilter = () => {
        this.setState({filterShown: !this.state.filterShown})
    }

    setQuery = (groupQuery) => {
        const query = this.state.query
        query[this.state.selectedGroup] = groupQuery
        this.setState({query})
    }

    toggleCustom = (id) => {
        const timetables = this.state.customTimetable
        let customTimetable = timetables[this.state.selectedGroup] || []
        if (customTimetable.indexOf(id) < 0) {
            customTimetable.push(id)
        } else {
            customTimetable = customTimetable.filter(timetableId => timetableId !== id)
        }
        timetables[this.state.selectedGroup] = customTimetable

        this.setState({customTimetable: timetables})
    }

    createScreenshot = () => {
        ReactGA.ga('send', 'event', 'Timetable', 'save_image', null, this.state.selectedGroup)
        this.setState({
            groupSelectorShown: false,
            filterShown: false
        }, () => {
            setTimeout(() => {
                this.weekRef.current.screenshot(() => {
                    this.setState({
                        filterShown: true
                    })
                })
            }, 600)
        })
    }

    saveScreenshot = (canvas) => {
        const img = canvas.toDataURL("image/png")
        const selectById = Groups.selectById(this.state.selectedGroup, Groups.groupByType(this.state.groups))
        const name = (selectById && selectById.length > 0 ? selectById[0].name : "Erebor")
        download(img, name + '.png')
    }
}

export default App
