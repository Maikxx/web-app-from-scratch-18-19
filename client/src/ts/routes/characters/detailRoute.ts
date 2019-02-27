import { CharacterDetailView } from '../../views/CharacterDetailView'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'

interface Args {
    id: string
}

export function handleCharacterDetailRoute(host: HTMLElement, router: Navigo) {
    return function({ id }: Args) {
        M.resetComponent(host)
        new CharacterDetailView({ host, id, router })
    }
}
