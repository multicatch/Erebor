class TimetableFilter {
    static filter(timetable, query) {
        let result = timetable

        if (query.search) {
            result = TimetableFilter.filterBySearchQuery(result, query.search)
        }

        if (query.groups) {
            result = TimetableFilter.filterByGroups(result, query.groups)
        }

        return result
    }

    static groupsOf(timetable) {
        return timetable.reduce((result, item) => {
            const name = item.type.shortcut
            result[name] = result[name] || []
            result[name] = Array.from(new Set([...result[name], item.students_array[0].group]))
            result[name].sort((a, b) => parseInt(a) > parseInt(b))
            return result
        }, {})
    }

    static filterBySearchQuery(timetable, query) {
        const searchQuery = query.toLowerCase()

        return timetable.filter(item =>
            item['event_array'][0]['room'].toLowerCase().includes(searchQuery)
            || item['subject'].toLowerCase().includes(searchQuery)
            || item['teacher_array'][0]['name'].toLowerCase().includes(searchQuery)
            || `${item.type.shortcut}${item.students_array[0].group}`.toLowerCase().includes(searchQuery.replace(" ", ""))
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
                const matchingGroups = groups.filter(group => item.type.shortcut === group.type)

                return matchingGroups.length === 0 || matchingGroups[0].group === item.students_array[0].group
            }
        )
    }
}

export default TimetableFilter