import { resetHost } from '../../utils/reset'
import { CharacterDetailView } from '../../views/CharacterDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleCharacterDetailRoute(host: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHost(host)
        new CharacterDetailView({ host, id: args.id, router })
    }
}
