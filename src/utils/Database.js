import Dexie from 'dexie';

const DATABASE_NAME = 'moria_cache'
const DATABASE_VERSION = 1

const db = new Dexie(DATABASE_NAME)
db.version(DATABASE_VERSION)
    .stores({
        groups: '++timestamp, response',
        timetables: '++id, timestamp, response'
    })

export default db