import { Character } from '../types/Character'

export async function fetchCharacters(): Promise<Character[]> {
    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const charactersUrl = `${characterUrlRoot}/?pageSize=100000`

    try {
        const data = await fetch(charactersUrl)
        return data.json()
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}
