import { CharacterMasterView } from '../../views/CharacterMasterView'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'

export function handleCharacterIndexRoute(host: HTMLElement, router: Navigo) {
    return function() {
        M.resetComponent(host)
        new CharacterMasterView({ host, router })
    }
}
