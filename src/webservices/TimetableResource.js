import db from '../utils/Database'
import Dexie from 'dexie'

class TimetableResource {
    static CACHE_TIME = 60 * 60 * 1000 * 6

    static fetch(group) {
        let existentResult = {activities:[]}

        return db.timetablesv2
            .where("id").equals(group)
            .first(result => {
                if (result.response) {
                    existentResult = result.response
                }
                if (result.timestamp > new Date(Date.now() - this.CACHE_TIME)) {
                    return result.response
                } else {
                    throw new Dexie.NotFoundError("Timetable too old")
                }
            })
            .catch(() => {
                return TimetableResource.fetchFromWebservice(group)
                    .then(result => {
                        db.timetablesv2
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
        return fetch("https://erebor.vpcloud.eu:8043/timetable/moria/" + group)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Cannot fetch timetable for ${group} - service unavailable`)
            })
    }
}

export default TimetableResource