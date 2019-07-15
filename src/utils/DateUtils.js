class DateUtils {
    static datesEqual(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate()
    }

    static getDayOfWeek(date) {
        if (date.getUTCDay() === 0) {
            return 6
        }
        return date.getUTCDay() - 1
    }
}

export default DateUtils