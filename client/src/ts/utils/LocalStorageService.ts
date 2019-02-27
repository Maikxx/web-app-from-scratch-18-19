export class LocalStorageService {
    public static housesKey = 'houses'
    public static charactersKey = 'characters'
    public static booksKey = 'books'

    public initialize() {
        if (!this.get(LocalStorageService.housesKey)) {
            this.set(LocalStorageService.housesKey, [])
        }

        if (!this.get(LocalStorageService.charactersKey)) {
            this.set(LocalStorageService.charactersKey, [])
        }

        if (!this.get(LocalStorageService.booksKey)) {
            this.set(LocalStorageService.booksKey, [])
        }
    }

    public merge(key: string, newData: any) {
        const existingData = this.get(key)
        const mergedData = [ ...existingData, newData ]

        this.set(key, mergedData)
    }

    public set(key: string, value: any[]) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            throw new Error(error)
        }
    }

    public get(key: string) {
        try {
            const data = localStorage.getItem(key)

            return data
                ? JSON.parse(data)
                : null
        } catch (error) {
            throw new Error(error)
        }
    }
}
