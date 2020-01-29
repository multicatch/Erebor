class TimetableFilter {
    static filter(timetable, query) {
        let result = timetable

        if (query.search) {
            result = TimetableFilter.filterBySearchQuery(result, query.search)
        }

        return result
    }

    static filterBySearchQuery(timetable, query) {
        const searchQuery = query.toLowerCase()

        return timetable.filter(item =>
            item['event_array'][0]['room'].toLowerCase().includes(searchQuery)
            || item['subject'].toLowerCase().includes(searchQuery)
            || item['teacher_array'][0]['name'].toLowerCase().includes(searchQuery)
        )
    }
}

export default TimetableFilter