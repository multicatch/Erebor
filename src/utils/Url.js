class Url {
    static parse(state, hash) {
        const trimmedHash = hash.replace(/^#+!/, '').split('&')
        return trimmedHash.reduce((result, hash) => this.parseSingle(result, hash), state)
    }

    static parseSingle(state, hash) {
        const result = state
        if (hash.substring(0, 2) === 's/') {
            result.selectedGroup = parseInt(hash.substring(2))
        }
        if (hash.substring(0, 2) === 't/') {
            const query = result.query[result.selectedGroup] || {}
            query.manualMode = 1
            result.query[result.selectedGroup] = query
            result.customTimetable[result.selectedGroup] = JSON.parse(decodeURI(hash.substring(2)))
        }
        if (hash.substring(0, 2) === 'g/') {
            const query = result.query[result.selectedGroup] || {}
            query.groups = JSON.parse(decodeURI(hash.substring(2)))
            result.query[result.selectedGroup] = query
        }
        if (hash.substring(0, 2) === 'i') {
            const query = result.query[result.selectedGroup] || {}
            query.importantVisible = true
            result.query[result.selectedGroup] = query
        }
        return result
    }

    static stringify(state) {
        const result = []
        if (state.selectedGroup) {
            result.push('s/' + state.selectedGroup)
        }

        const queryElement = state.query[state.selectedGroup]
        const isManualModeOn = queryElement && queryElement.manualMode === 1

        if (isManualModeOn && state.customTimetable[state.selectedGroup]) {
            const timetable = state.customTimetable[state.selectedGroup].filter(item => Number.isInteger(item))
            result.push('t/' + encodeURI(JSON.stringify(timetable)))
        }
        if (queryElement && queryElement.groups) {
            result.push('g/' + encodeURI(JSON.stringify(queryElement.groups)))
        }
        if (isManualModeOn && queryElement.importantVisible) {
            result.push('i')
        }

        return '#!' + result.join('&')
    }
}

export default Url