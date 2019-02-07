import { Character } from '../types/Character'

export function sortCharactersByName(a: Character, b: Character) {
    return a.name > b.name
        ? 1
        : -1
}
