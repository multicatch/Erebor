class SettingsRepository {

    static REPOSITORY_KEY = 'ereborSettings_v1'

    static save(settings) {
        localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(settings))
    }

    static retrieveFiltered(defaultSettings, keys = false) {
        const config = this.retrieve(defaultSettings)
        if (keys) {
            const configKeys = Object.keys(config)
            for (const key of configKeys) {
                if (!keys.includes(key)) {
                    config[key] = defaultSettings[key]
                }
            }
        }
        return config
    }

    static retrieve(defaultSettings) {
        try {
            return JSON.parse(localStorage.getItem(this.REPOSITORY_KEY)) || defaultSettings
        } catch (error) {
            console.error(error)
            return defaultSettings
        }
    }
}

export default SettingsRepository