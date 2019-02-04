export class Store {
    public url: string

    constructor() {
        this.url = window.location.href
    }

    public set(key: string, value: any) {
        this[key] = value
    }

    public get(key: string) {
        return this[key]
    }
}
