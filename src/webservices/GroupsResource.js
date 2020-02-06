import db from '../utils/Database'
import Dexie from 'dexie'

class GroupsResource {
    static fetch() {
        return db.groups
            .where("timestamp").above(new Date(Date.now() - 60 * 60 * 1000 * 24))
            .first(result => result.response)
            .catch(() => {
                    const result = GroupsResource.fetchFromWebservice()
                    db.groups.clear()
                        .then(() => db.groups.put({
                            "timestamp": new Date(),
                            "response": result
                        }))
                        .catch(Dexie.OpenFailedError, (e) => {
                            console.error("Are you using private mode? Cache will be disabled. Major slowdowns are to be expected!\n\nError: " + e.message)
                            return result
                        })
                }
            )
    }

    static fetchFromWebservice() {
        return fetch("https://erebor.vpcloud.eu/api/students/")
            .then(response => response.json())
            .then(data => data.result.array)
    }
}

export default GroupsResource