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

    static formatHours(hours) {
        return (new Array(2).fill(0).join('') + hours).slice(-2)
    }

    static monthFromRoman(numeral) {
        return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"].indexOf(numeral)
    }

    static isDayInWeek(day, month, startOfWeek) {
        const endOfWeek = new Date(startOfWeek.getUTCFullYear(), startOfWeek.getUTCMonth(), startOfWeek.getUTCDate() + 6)
        const isDateInRange = (startOfWeek.getUTCDate() <= day && startOfWeek.getUTCDate() + 6 >= day)
        if (startOfWeek.getUTCMonth() === endOfWeek.getUTCMonth()) {
            return startOfWeek.getUTCMonth() + 1 === month && isDateInRange
        } else {
            return (startOfWeek.getUTCMonth() + 1 === month || startOfWeek.getUTCMonth() + 2 === month) && isDateInRange
        }

    }

    static parseDuration(time) {
        const timeParts = time.split(":")
        return parseInt(timeParts[0]) + (parseInt(timeParts[1]) / 60.0)
    }
}

export default DateUtils