export interface FetcherProps {
    options?: RequestInit
    url: string
}

export class Fetcher {
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
