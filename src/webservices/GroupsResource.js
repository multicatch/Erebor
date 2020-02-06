import db from '../utils/Database'
import Dexie from 'dexie'

class GroupsResource {
    static CACHE_TIME = 60 * 60 * 1000 * 24

    static fetch() {
        let existentResult = []

        return db.groups
            .limit(1)
            .first(result => {
                existentResult = result.response || []
                if (result.timestamp > new Date(Date.now() - this.CACHE_TIME) && result.response) {
                    return result.response
                } else {
                    throw new Dexie.NotFoundError("Group too old")
                }
            })
            .catch(() => {
                    return GroupsResource.fetchFromWebservice()
                        .then(result => {
                            db.groups.clear()
                                .then(() => db.groups.put({
                                    "timestamp": new Date(),
                                    "response": result
                                }))
                                .catch(Dexie.OpenFailedError, (e) => {
                                    console.error("Are you using private mode? Cache will be disabled. Major slowdowns are to be expected!\n\nError: " + e.message)
                                    return result
                                })
                            return result
                        })
                        .catch((e) => {
                            console.error(e.message)
                            return existentResult
                        })
                }
            )
    }

    static fetchFromWebservice() {
        return fetch("https://erebor.vpcloud.eu/api/students/")
            .then(response => {
                if (response.ok) {
                    response.json()
                }
                throw new Error("Cannot fetch groups - service unavailable")
            })
            .then(data => data.result.array)
    }
}

export default GroupsResource