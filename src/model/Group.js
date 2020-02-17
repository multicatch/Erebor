class Group {
    id
    name
    year

    constructor(id, name, year = false) {
        this.id = id
        this.name = name

        if (!year) {
            const words = this.name.split(" ")
            if (/^\d+$/.test(words[0])) {
                this.year = parseInt(words[0])
                words.shift()
            }
            this.name = words.join(" ").trim()
        } else {
            this.year = year
        }
    }

}

export default Group