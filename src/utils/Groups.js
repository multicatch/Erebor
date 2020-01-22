class Groups {
    static fetchGroups() {
        const data = JSON.parse("{\"result\":{\"array\":[{\"id\":0,\"name\":\"\"},{\"id\":3,\"name\":\"0i SKNI Stud. Koło Nauk. Inf. (zaj. cykl.)\"},{\"id\":0,\"name\":\"\"},{\"id\":145,\"name\":\"3 Geografia I stopień stacj.cały rok\"},{\"id\":0,\"name\":\"\"},{\"id\":155,\"name\":\"2 Turystyka i rekreacja I stopień stacjonarne, organizacja i obsługa ruchu turystycznego\"},{\"id\":156,\"name\":\"2 Turystyka i rekreacja I stopień stacjonarne, rekreacja ruchowa i zdrowotna\"},{\"id\":158,\"name\":\"3 Turystyka i rekreacja I stopień stacjonarne, organizacja i obsługa ruchu turystycznego\"},{\"id\":162,\"name\":\"2 Turystyka i rekreacja stacjonarne II stopień, Planowanie i zarządzanie w turystyce i rekreacji\"},{\"id\":0,\"name\":\"\"},{\"id\":207,\"name\":\"3 Chemia środków bioaktywnych i kosmetyków I stopień stacjonarne\"},{\"id\":212,\"name\":\"Wykład ogólnouniwersytecki\"},{\"id\":213,\"name\":\"1 filologia słowiańska\"},{\"id\":221,\"name\":\"1 Archeologia\"},{\"id\":284,\"name\":\"1 Geografia I stopień stacjonarne, cały kierunek\"},{\"id\":285,\"name\":\"1 Gospodarka przestrzenna stacjonarne inżynierskie, cały rok\"},{\"id\":286,\"name\":\"1 Turystyka i rekreacja stacjonarne I stopień, cały rok\"},{\"id\":288,\"name\":\"1 Turystyka i rekreacja stacjonarne II stopień, Turystyka zdrowotna\"},{\"id\":289,\"name\":\"1 Turystyka i rekreacja stacjonarne II stopień, Planowanie i zarządzanie w turystyce i rekreacji\"},{\"id\":294,\"name\":\"1 Geografia stacjonarne II stopień, Klimatologia i gospodarka wodna (O)\"},{\"id\":383,\"name\":\"Pracownicy WNoZiGP\"},{\"id\":411,\"name\":\"Studium doktoranckie fizyki\"},{\"id\":416,\"name\":\"1 Chemia Analityka Chemiczna I stopień\"},{\"id\":417,\"name\":\"1 Chemia Podstawowa i Stosowana I stopień\"},{\"id\":418,\"name\":\"1 Chemia Środków Bioaktywnych i Kosmetyków I stopień\"},{\"id\":419,\"name\":\"1 Chemia Kryminalistyczna I stopień\"},{\"id\":421,\"name\":\"1 Geoinformatyka I stopnia stacjonarne\"},{\"id\":423,\"name\":\"2 Gospodarka przestrzenna stacjonarne inżynierskie, cały rok\"},{\"id\":426,\"name\":\"2 Turystyka i rekreacja stacjonarne II stopień, Turystyka zdrowotna\"},{\"id\":427,\"name\":\"3 Turystyka i rekreacja I stopień stacjonarne, rekreacja ruchowa i zdrowotna\"},{\"id\":428,\"name\":\"2 Turystyka i rekreacja I stopień stacjonarne, hotelarstwo\"},{\"id\":438,\"name\":\"Studia doktoranckie WNoZiGP\"},{\"id\":469,\"name\":\"1 Biologia\"},{\"id\":477,\"name\":\"UMCS\"},{\"id\":480,\"name\":\" Erasmus\"},{\"id\":482,\"name\":\"0i Zaj. jednorazowe M\\\\DD\"},{\"id\":488,\"name\":\"Szkoły średnie (zaj. cykl.)\"},{\"id\":0,\"name\":\"\"},{\"id\":522,\"name\":\"SEMINARIA IF\"},{\"id\":525,\"name\":\"1 Grafika i edukacja artystyczna\"},{\"id\":551,\"name\":\"2 Geoinformatyka I stopnia stacjonarne\"},{\"id\":553,\"name\":\"3 Gospodarka przestrzenna stacj. inżynierskie, Planowanie przestrzenne\"},{\"id\":558,\"name\":\"2 Turystyka i rekreacja stacjonarne II stopień, Turystyka dzieci i młodzieży\"},{\"id\":0,\"name\":\"\"},{\"id\":562,\"name\":\"3 Turystyka i rekreacja I stopień stacjonarne, hotelarstwo\"},{\"id\":695,\"name\":\"2 Kognitywistyka\"},{\"id\":696,\"name\":\"3 Kognitywistyka\"},{\"id\":697,\"name\":\"1 Kognitywistyka\"},{\"id\":727,\"name\":\"1 Chemia techniczna wydz. Puławy\"},{\"id\":735,\"name\":\"4 Gospodarka przestrzenna stacj. inżynierskie, Planowanie przestrzenne\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":739,\"name\":\"3 Geoinformatyka I stopnia stacjonarne\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":784,\"name\":\"Ekonomia\"},{\"id\":785,\"name\":\"1 Logopedia II stopien\"},{\"id\":806,\"name\":\"2 Fizyka techniczna I stopien stacjonarny\"},{\"id\":820,\"name\":\"1 Archiwistyka II st. spec. Inf. b.\"},{\"id\":823,\"name\":\"0i SEMINARIA I.I. i podobne zaj. cykl.\"},{\"id\":838,\"name\":\"1 Informatyka II st. stac.\"},{\"id\":840,\"name\":\"3 Informatyka I st. stac.\"},{\"id\":841,\"name\":\"2 Informatyka I st. stac.\"},{\"id\":842,\"name\":\"1 Informatyka I st. stac.\"},{\"id\":844,\"name\":\"1 Geoinformatyka II stopnia stacjonarne\"},{\"id\":845,\"name\":\"2 Gospodarka przestrzenna stacjonarne  II stopień, Gospodarka regionalna\"},{\"id\":846,\"name\":\"2 Gospodarka przestrzenna stacjonarne  II stopień, Urbanistyka i polityka przestrzenna\"},{\"id\":847,\"name\":\"2 Archiwistyka II st. spec. Inf. b.\"},{\"id\":848,\"name\":\"1 Fizyka techniczna II stopień stacjonarny\"},{\"id\":850,\"name\":\"1 Społeczeństwo Informacyjne I stopien\"},{\"id\":851,\"name\":\"3 Fizyka I st. stacj.\"},{\"id\":852,\"name\":\"3 Fizyka techniczna I st. stac. Fiz. Medyczna\"},{\"id\":853,\"name\":\"4 Fizyka techniczna Fiz. Medyczna. I st. stac. \"},{\"id\":855,\"name\":\"2 Inżynieria Nowoczesnych Materiałów\"},{\"id\":856,\"name\":\"1 Inżynieria Nowoczesnych Materiałów\"},{\"id\":858,\"name\":\"3 Inżynieria Nowoczesnych Materiałów\"},{\"id\":859,\"name\":\"1 Fizyka techniczna I stopien stacjonarny\"},{\"id\":863,\"name\":\"2 Kognitywistyka II st.\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":875,\"name\":\"0i Samorząd Wydziałowy WMFiI\"},{\"id\":876,\"name\":\"1 Tourism Management stacjonarne I stopnia\"},{\"id\":877,\"name\":\"2 Geoinformatyka II stopnia stacjonarne\"},{\"id\":879,\"name\":\"2 Turystyka i rekreacja I stopień stacjonarne, zarządzanie zasobami turystycznymi\"},{\"id\":0,\"name\":\"\"},{\"id\":882,\"name\":\"4 Inżynieria nowoczesnych materiałów \"},{\"id\":884,\"name\":\"2 Społeczeństwo Informacyjne I stopien\"},{\"id\":886,\"name\":\"2 Informatyka II st. stac.\"},{\"id\":887,\"name\":\"3 Techn. c. w anim. kultury\"},{\"id\":889,\"name\":\"2 Archiwistyka I st.\"},{\"id\":0,\"name\":\"\"},{\"id\":895,\"name\":\"2 Politologia sp. Produkcja Medialna\"},{\"id\":897,\"name\":\"SKPB\"},{\"id\":898,\"name\":\"0i Uniwersytet Dziecięcy UMCS\"},{\"id\":900,\"name\":\"1 Techn. c. w anim. kult. II st.\"},{\"id\":901,\"name\":\"1 Mat dz lic\"},{\"id\":902,\"name\":\"Szkoła Doktorska Nauk Ścisłych i Przyrodniczych\"},{\"id\":903,\"name\":\"Centrum języka polskiego\"},{\"id\":904,\"name\":\"2 Mat dz lic (fin)\"},{\"id\":905,\"name\":\"2 Mat dz lic (inf)\"},{\"id\":906,\"name\":\"2 Mat dz lic (naucz)\"},{\"id\":907,\"name\":\"3 Mat dz lic (fin)\"},{\"id\":909,\"name\":\"3 Mat dz lic (inf)\"},{\"id\":0,\"name\":\"\"},{\"id\":912,\"name\":\"2 Mat w Fin dz uz (akt)\"},{\"id\":913,\"name\":\"3 Mat dz lic (naucz)\"},{\"id\":914,\"name\":\"1 Mat w Fin dz lic\"},{\"id\":0,\"name\":\"\"},{\"id\":916,\"name\":\"2 Mat w Fin dz lic\"},{\"id\":0,\"name\":\"\"},{\"id\":919,\"name\":\"1 Kognitywistyka II st.\"},{\"id\":921,\"name\":\"2 Archiwistyka II st. spec. Zarz. dok.\"},{\"id\":0,\"name\":\"\"},{\"id\":930,\"name\":\"2 Tourism Management stacjonarne I stopnia\"},{\"id\":931,\"name\":\"1 Inżynieria Nowoczesnych Materiałów II st.\"},{\"id\":933,\"name\":\"Akademia Kreatywnego Rozwoju\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":937,\"name\":\"Seminarium Zakładowe\"},{\"id\":940,\"name\":\"3 Turystyka i rekreacja I stopień stacjonarne, zarządzanie zasobami turystycznymi\"},{\"id\":941,\"name\":\"2 Historia II st.\"},{\"id\":944,\"name\":\"3 Społeczeństwo Informacyjne I stopień\"},{\"id\":0,\"name\":\"\"},{\"id\":947,\"name\":\"Rezerwacje Matematyka\"},{\"id\":952,\"name\":\"1 Biologia_ENG\"},{\"id\":953,\"name\":\"1 Biologii\"},{\"id\":955,\"name\":\"2 Politologia II st sp. Wydawnicza\"},{\"id\":959,\"name\":\"Rezerwcja sali\"},{\"id\":960,\"name\":\"Wydział Prawa i Administracji\"},{\"id\":961,\"name\":\"3 Gospodarka przestrzenna stacj. inżynierskie, Zarządzanie przestrzenią\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":0,\"name\":\"\"},{\"id\":966,\"name\":\"2 Geografia I stopień stacjonarne, cały kierunek\"},{\"id\":967,\"name\":\"4 Gospodarka przestrzenna stacj. inżynierskie, Zarządzanie przestrzenią\"},{\"id\":968,\"name\":\"1 Turystyka i rekreacja stacjonarne II stopień, Zarządzanie w hotelarstwie\"},{\"id\":969,\"name\":\"3 Tourism Management stacjonarne I stopnia\"},{\"id\":970,\"name\":\"2 Geografia II stopień stacjonarne, klimatologia i gospodarka wodna + zarządzanie środowiskiem (O) \"},{\"id\":971,\"name\":\"Pracownicy INoZ\"},{\"id\":972,\"name\":\"Pracownicy IGSPiGP\"},{\"id\":974,\"name\":\"1 Techn cyf II st INST KULTUROZNAWSTWA\"},{\"id\":975,\"name\":\"1 Naucz Mat Inf dz lic\"},{\"id\":978,\"name\":\"1 mat dz uz\"},{\"id\":980,\"name\":\"3 mat w fin dz lic (ubezp)\"},{\"id\":983,\"name\":\"2 mat dz uz (fin)\"},{\"id\":984,\"name\":\"1 Społeczeństwo Informacyjne II stopień\"},{\"id\":986,\"name\":\"1 mat dz dr\"},{\"id\":987,\"name\":\"2 mat dz dr\"},{\"id\":988,\"name\":\"Koło Olimpijskie Matematyki\"},{\"id\":990,\"name\":\"Studia Podyplomowe Informatyka\"},{\"id\":991,\"name\":\"0m Zaj. jednorazowe Inst. Mat.\"},{\"id\":992,\"name\":\"0f Zaj. jednorazowe Inst. Fiz.\"}],\"count\":155},\"status\":\"ok\"}")

        return new Promise(resolve => {
            resolve(data)
        }).then(data => data.result.array)
    }

    static groupIdFrom(name, groups) {
        const groupByType = Groups.groupByType(groups)
        if (groupByType[name] && groupByType[name].length > 0) {
            groupByType[name].sort((a, b) => a.year > b.year)
            return groupByType[name][0].id
        } else {
            return 0
        }
    }

    static groupByType(groups) {
        if (!groups) {
            return {}
        }

        return groups
            .filter(item => item.id !== 0)
            .map(item => {
                const result = {
                    id: item.id,
                    name: item.name,
                    year: 0
                }
                const words = item.name.split(" ")
                if (/^\d+$/.test(words[0])) {
                    result.year = parseInt(words[0])
                    words.shift()
                }

                result.name = words.join(" ").trim()
                return result
            })
            .reduce((result, currentGroup) => {
                const name = currentGroup.name
                result[name] = result[name] || []
                result[name].push(currentGroup)
                return result
            }, {})
    }

    static selectById(id, groupsByType) {
        return Object.keys(groupsByType)
            .filter(key => groupsByType[key].reduce((result, group) => result || group.id === id, false))
            .flatMap(key => groupsByType[key])
    }
}

export default Groups