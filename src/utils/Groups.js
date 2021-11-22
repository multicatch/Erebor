class Groups {

    static selectById(id, groupsByType) {
        return Object.keys(groupsByType)
            .filter(key => groupsByType[key].find(group =>
                group.id === id || group.id === "" + id
            ))
            .flatMap(key => groupsByType[key])
    }
}

export default Groups