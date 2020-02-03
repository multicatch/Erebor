class SettingsRepository {

    static REPOSITORY_KEY = 'ereborSettings_v1'

    static save(settings) {
        localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(settings))
    }

    static retrieve(defaultSettings) {
        try {
            return JSON.parse(localStorage.getItem(this.REPOSITORY_KEY)) || defaultSettings
        } catch (error) {
            console.log(error)
            return defaultSettings
        }
    }
}

export default SettingsRepository