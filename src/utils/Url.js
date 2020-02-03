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
        if (hash.substring(0, 2) === 'q/') {
            result.query = JSON.parse(decodeURI(hash.substring(2)))
        }
        if (hash.substring(0, 2) === 't/') {
            result.customTimetable = JSON.parse(decodeURI(hash.substring(2)))
        }
        return result
    }

    static stringify(state, extended = false) {
        const result = []
        if (state.selectedGroup) {
            result.push('s/' + state.selectedGroup)
        }

        if (extended) {
            if (state.query) {
                result.push('q/' + encodeURI(JSON.stringify(state.query)))
            }
            if (state.customTimetable) {
                result.push('t/' + encodeURI(JSON.stringify(state.customTimetable.filter(item => Number.isInteger(item)))))
            }
        }

        return '#!' + result.join('&')
    }
}

export default Url