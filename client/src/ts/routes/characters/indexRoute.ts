import { resetHost } from '../../utils/reset'
import { CharacterMasterView } from '../../views/CharacterMasterView'
import Navigo from 'navigo'

export function handleCharacterIndexRoute(host: HTMLElement, router: Navigo) {
    return function() {
        resetHost(host)
        new CharacterMasterView({ host, router })
    }
}
