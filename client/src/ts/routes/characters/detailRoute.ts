import { resetHook } from '../../utils/reset'
import { CharacterDetailView } from '../../views/CharacterDetailView'
import { Router } from '../../components/Core/Router'

export function handleCharacterDetailRoute(hook: HTMLElement, router: Router) {
    return function(args: number) {
        resetHook(hook)
        new CharacterDetailView({ hook, id: args, router })
    }
}
