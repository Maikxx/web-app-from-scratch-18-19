import { Fetcher } from '../utils/Fetcher'

export async function fetchCharacters() {
    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const charactersUrl = `${characterUrlRoot}/?pageSize=50`

    return new Fetcher({ url: charactersUrl }).fetch()
}
