import db from '../utils/Database'

class TimetableResource {
    static fetch(group) {
        return db.timetables
            .where("id").equals(group)
            .and(item => item.timestamp > new Date(Date.now() - 60 * 60 * 1000 * 6))
            .first(result => result.response)
            .catch(() => {
                const result = TimetableResource.fetchFromWebservice(group)
                db.timetables
                    .put({
                        "id": group,
                        "timestamp": new Date(),
                        "response": result
                    })
                return result
            })
    }

    static fetchFromWebservice(group) {
        return fetch("https://erebor.vpcloud.eu/api/timetable/?id=" + group)
            .then(response => response.json())
            .then(data => data.result.array)
            .then(data => data.filter(item => item === data.filter(i => i.id === item.id)[0]))
    }
}

export default TimetableResource