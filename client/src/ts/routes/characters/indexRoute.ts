import { resetHook } from '../../utils/reset'
import { CharacterMasterView } from '../../views/CharacterMasterView'
import Navigo from 'navigo'

export function handleCharacterIndexRoute(hook: HTMLElement, router: Navigo) {
    return function() {
        resetHook(hook)
        new CharacterMasterView({ hook, router })
    }
}
