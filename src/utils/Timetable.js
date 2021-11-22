import DateUtils from './DateUtils'

class Timetable {
    static HOUR_HEIGHT = 64

    static DAYS_OF_WEEK = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    static filterDayOfWeek(day, timetable) {
        return timetable.filter(event =>
            Timetable.DAYS_OF_WEEK.indexOf(event.occurrence.Regular.weekday) + 1 === parseInt(day)
        )
    }

    static filterByDate(timetable, startOfWeek) {
        return timetable
            .filter(event => {
                const subjectWords = event.name.split(" ")
                if (/[0-9]{1,2}\\[0-9]{1,2}/.test(subjectWords[0])) {
                    const monthAndDate = subjectWords[0].split("\\")
                    const month = parseInt(monthAndDate[0])
                    const day = parseInt(monthAndDate[1])

                    return DateUtils.isDayInWeek(day, month, startOfWeek)
                }
                return true
            })
            .filter(event => {
                const subject = event.name
                let isMatching = true
                const sinceMatch = subject.match(/(?:OD )(?:([0-9]{1,2}\.[IVX]{1,3}))/)
                const untilMatch = subject.match(/(?:DO )(?:([0-9]{1,2}\.[IVX]{1,3}))/)
                if (sinceMatch != null) {
                    const since = sinceMatch[1].split(".")
                    const day = parseInt(since[0])
                    const month = DateUtils.monthFromRoman(since[1])

                    isMatching &= month < startOfWeek.getUTCMonth()
                        || (month === startOfWeek.getUTCMonth() && day <= startOfWeek.getUTCDate())
                }

                if (untilMatch != null) {
                    const until = untilMatch[1].split(".")
                    const day = parseInt(until[0])
                    const month = DateUtils.monthFromRoman(until[1])

                    isMatching &= month > startOfWeek.getUTCMonth()
                        || (month === startOfWeek.getUTCMonth() && day >= startOfWeek.getUTCDate())
                        || DateUtils.isDayInWeek(day, month + 1, startOfWeek)
                }

                return isMatching
            })
    }
    
    static getOffsetFor(time) {
        const duration = DateUtils.parseDuration(time)
        return this.HOUR_HEIGHT * duration
    }

    static concurrentDataOf(item, timetable) {
        const directlyConcurrentItems = this.directlyConcurrentDataFor(item, timetable)
        const filteredTimetable = timetable.filter(timetableItem => timetableItem !== item && !directlyConcurrentItems.includes(timetableItem))
        const additionalConcurrent = directlyConcurrentItems.flatMap(concurrentItem => this.concurrentDataOf(concurrentItem, filteredTimetable).items)
        const concurrentItems = directlyConcurrentItems.concat(additionalConcurrent)

        return {
            count: concurrentItems.length,
            index: concurrentItems.indexOf(item),
            width: concurrentItems.length / directlyConcurrentItems.length,
            items: concurrentItems
        }
    }

    static directlyConcurrentDataFor(item, timetable) {
        const startTime = DateUtils.parseDuration(item.time.start_time)
        const endTime = startTime + DateUtils.parseDuration(item.time.duration)

        return timetable.filter(otherItem => {
            const otherStartTime = DateUtils.parseDuration(otherItem.time.start_time)
            const otherEndTime = otherStartTime + DateUtils.parseDuration(otherItem.time.duration)
            return ((otherStartTime >= startTime && otherStartTime < endTime) ||
                (otherEndTime > startTime && otherEndTime <= endTime))
        })
    }
}

export default Timetable