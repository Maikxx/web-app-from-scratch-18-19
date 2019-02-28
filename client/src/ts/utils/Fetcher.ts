export interface FetcherProps {
    options?: RequestInit
    url: string
}

export class Fetcher {
    public static API_OF_FIRE_AND_ICE_URL_BASE = `https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api`

    constructor(private props: FetcherProps) {}

    public async fetch() {
        const { url, options } = this.props

        try {
            const response = await fetch(url, options)
            return response.json()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
