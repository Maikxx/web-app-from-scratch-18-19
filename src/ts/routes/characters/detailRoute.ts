import { resetHook } from '../../utils/reset'
import { CharacterDetailView } from '../../views/CharacterDetailView'

export function handleCharacterDetailRoute(hook: HTMLElement) {
    return function(args: number) {
        resetHook(hook)
        new CharacterDetailView({ hook, id: args })
    }
}