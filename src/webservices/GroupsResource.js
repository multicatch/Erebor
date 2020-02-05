import db from '../utils/Database'

class GroupsResource {
    static fetch() {
        return db.groups
            .where('timestamp').above(new Date(Date.now() - 60 * 60 * 1000 * 6))
            .first(result => result.response)
            .catch(() =>
                db.groups.clear().then(() => this.fetchFromWebservice())
            )
    }

    static fetchFromWebservice() {
        return fetch("https://erebor.vpcloud.eu/api/students/")
            .then(response => response.json())
            .then(data => data.result.array)
            .then(data => {
                db.groups
                    .put({
                        "timestamp": new Date(),
                        "response": data
                    })
                return data
            })
    }
}

export default GroupsResource