import { Fetcher } from '../utils/Fetcher'

export async function fetchCharacters(pageSize: number = 50, pageNumber: number = 1) {
    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const charactersUrl = `${characterUrlRoot}/?pageSize=${pageSize}&page=${pageNumber}`

    return new Fetcher({ url: charactersUrl }).fetch()
}
