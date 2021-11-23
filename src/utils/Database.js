import Dexie from 'dexie';

const DATABASE_NAME = 'moria_cache'
const DATABASE_VERSION = 2

const db = new Dexie(DATABASE_NAME)
db.version(DATABASE_VERSION)
    .stores({
        groups: '++timestamp, response',
        timetables: '++id, timestamp, response',
        groupsv2: '++timestamp, response',
        timetablesv2: '++id, timestamp, response'
    })

db.version(1)
    .stores({
        groups: '++timestamp, response',
        timetables: '++id, timestamp, response'
    })

export default db