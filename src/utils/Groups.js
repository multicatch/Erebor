class Groups {
    static fetchGroups() {
        return fetch("https://erebor.vpcloud.eu/api/students/")
            .then(response => response.json())
            .then(data => data.result.array)
    }

    static groupIdFrom(name, groups) {
        const groupByType = Groups.groupByType(groups)
        if (groupByType[name] && groupByType[name].length > 0) {
            groupByType[name].sort((a, b) => a.year > b.year)
            return groupByType[name][0].id
        } else {
            return 0
        }
    }

    static groupByType(groups) {
        if (!groups) {
            return {}
        }

        return groups
            .filter(item => item.id !== 0)
            .map(item => {
                const result = {
                    id: item.id,
                    name: item.name,
                    year: 0
                }
                const words = item.name.split(" ")
                if (/^\d+$/.test(words[0])) {
                    result.year = parseInt(words[0])
                    words.shift()
                }

                result.name = words.join(" ").trim()
                return result
            })
            .reduce((result, currentGroup) => {
                const name = currentGroup.name
                result[name] = result[name] || []
                result[name].push(currentGroup)
                return result
            }, {})
    }

    static selectById(id, groupsByType) {
        return Object.keys(groupsByType)
            .filter(key => groupsByType[key].reduce((result, group) => result || group.id === id, false))
            .flatMap(key => groupsByType[key])
    }
}

export default Groups