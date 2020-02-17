class Groups {

    static selectById(id, groupsByType) {
        return Object.keys(groupsByType)
            .filter(key => groupsByType[key].reduce((result, group) => result || group.id === id, false))
            .flatMap(key => groupsByType[key])
    }
}

export default Groups