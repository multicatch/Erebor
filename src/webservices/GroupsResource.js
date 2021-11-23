import db from '../utils/Database'
import Dexie from 'dexie'
import Group from '../model/Group'

class GroupsResource {
    static CACHE_TIME = 60 * 60 * 1000 * 24

    static fetch() {
        return this.fetchResponse()
            .then(result => GroupsResource.groupByType(result))
    }

    static fetchResponse() {
        let existentResult = []

        return db.groupsv2
            .limit(1)
            .first(result => {
                existentResult = result.response || []
                if (result.timestamp > new Date(Date.now() - this.CACHE_TIME) && result.response && result.response > 1) {
                    return result.response
                } else {
                    throw new Dexie.NotFoundError("Group too old")
                }
            })
            .catch(() => {
                    return GroupsResource.fetchFromWebservice()
                        .then(result => {
                            db.groupsv2.clear()
                                .then(() => db.groupsv2.put({
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
        return fetch("https://erebor.vpcloud.eu:8043/timetable/moria/")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Cannot fetch groups - service unavailable")
            })
    }

    static groupByType(groups) {
        if (!groups) {
            return {}
        }

        return groups
            .filter(item => item.id !== 0)
            .map(item => {
                let year = 0
                if (item.variant.Year) {
                    year = item.variant.Year
                }
                return new Group(item.id.id, item.name, year)
            })
            .reduce((result, currentGroup) => {
                const name = currentGroup.name
                result[name] = result[name] || []
                result[name].push(currentGroup)
                return result
            }, {})
    }

}

export default GroupsResource