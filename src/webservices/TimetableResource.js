import db from '../utils/Database'
import Dexie from 'dexie'

class TimetableResource {
    static CACHE_TIME = 60 * 60 * 1000 * 6

    static fetch(group) {
        let existentResult = []

        return db.timetables
            .where("id").equals(group)
            .first(result => {
                existentResult = result.response || []
                if (result.timestamp > new Date(Date.now() - this.CACHE_TIME)) {
                    return result.response
                } else {
                    throw new Dexie.NotFoundError("Timetable too old")
                }
            })
            .catch(() => {
                return TimetableResource.fetchFromWebservice(group)
                    .then(result => {
                        db.timetables
                            .put({
                                "id": group,
                                "timestamp": new Date(),
                                "response": result
                            })
                        return result
                    })
                    .catch((e) => {
                        console.error(e.message)
                        return existentResult
                    })
            })
    }

    static fetchFromWebservice(group) {
        return fetch("http://localhost:8000/timetable/moria/" + group)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Cannot fetch timetable for ${group} - service unavailable`)
            })
    }
}

export default TimetableResource