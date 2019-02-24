import { Fetcher } from '../utils/Fetcher'

export async function fetchCharacters(pageSize: number = 50, pageNumber: number = 1, searchText?: string) {
    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const searchParam = searchText && searchText.length > 0
        ? `&name=${searchText}`
        : ''
    const charactersUrl = `${characterUrlRoot}/?pageSize=${pageSize}&page=${pageNumber}${searchParam}`

    return new Fetcher({ url: charactersUrl }).fetch()
}
