import { resetHook } from '../../utils/reset'
import { CharacterDetailView } from '../../views/CharacterDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleCharacterDetailRoute(hook: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHook(hook)
        new CharacterDetailView({ hook, id: args.id, router })
    }
}
