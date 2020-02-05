import db from '../utils/Database'

class TimetableResource {
    static fetch(group) {
        return db.timetables
            .where({"id": group})
            .first(result => {
                if(result.timestamp > new Date(Date.now() - 60 * 60 * 1000 * 6)) {
                    return result.response
                } else {
                    return this.fetchFromWebservice(group)
                }
            })
            .catch(() =>
                this.fetchFromWebservice(group)
            )
    }

    static fetchFromWebservice(group) {
        return fetch("https://erebor.vpcloud.eu/api/timetable/?id=" + group)
            .then(response => response.json())
            .then(data => data.result.array)
            .then(data => {
                db.timetables
                    .put({
                        "id": group,
                        "timestamp": new Date(),
                        "response": data
                    })
                return data
            })
    }
}

export default TimetableResource