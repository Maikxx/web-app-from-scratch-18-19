import { Fetcher } from '../utils/Fetcher'

export async function fetchCharacters() {
    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const charactersUrl = `${characterUrlRoot}/?pageSize=100000`

    return new Fetcher({ url: charactersUrl }).fetch()
}
