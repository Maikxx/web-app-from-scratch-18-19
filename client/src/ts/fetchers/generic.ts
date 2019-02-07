export async function fetchByUrl<TData>(url: string): Promise<TData> {
    try {
        const data = await fetch(url)
        return data.json()
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}
