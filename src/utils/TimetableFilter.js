class TimetableFilter {
    static filter(timetable, query, customTimetable) {
        let result = timetable

        if (query.search) {
            result = TimetableFilter.filterBySearchQuery(result, query.search)
        }

        if (query.groups) {
            result = TimetableFilter.filterByGroups(result, query.groups)
        }

        if (query.manualMode && query.manualMode === 1) {
            result = TimetableFilter.filterById(result, query.importantVisible, customTimetable)
        }

        return result
    }

    static groupsOf(timetable) {
        return timetable.reduce((result, item) => {
            const name = item.group.symbol
            result[name] = result[name] || []
            result[name] = Array.from(new Set([...result[name], item.group.number]))
            result[name].sort((a, b) => parseInt(a) - parseInt(b))
            return result
        }, {})
    }

    static filterBySearchQuery(timetable, query) {
        const searchQuery = query.toLowerCase()

        return timetable.filter(item =>
            item['room'].toLowerCase().includes(searchQuery)
            || item['name'].toLowerCase().includes(searchQuery)
            || item['teacher'].toLowerCase().includes(searchQuery)
            || `${item.group.symbol}${item.group.number}`.toLowerCase().includes(searchQuery.replace(" ", ""))
        )
    }

    static filterByGroups(timetable, groupQuery) {
        const groups = Object.keys(groupQuery)
            .filter(key => groupQuery[key])
            .map(key => {
                return {
                    type: key,
                    group: groupQuery[key]
                }
            })

        return timetable.filter(item => {
                const matchingGroups = groups.filter(group => item.group.symbol === group.type)

                return matchingGroups.length === 0 || matchingGroups[0].group === item.group.number
            }
        )
    }

    static filterById(timetable, importantVisible, customTimetable) {
        return timetable
            .filter(event => (importantVisible && event.group.symbol === "PR") || customTimetable.indexOf(event.id) >= 0)
    }
}

export default TimetableFilter