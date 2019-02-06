import { resetHook } from '../../utils/reset'
import { Router } from '../../components/Core/Router'
import { CharacterMasterView } from '../../views/CharacterMasterView'

export function handleCharacterIndexRoute(hook: HTMLElement, router: Router) {
    return function() {
        resetHook(hook)
        new CharacterMasterView({ hook, router })
    }
}
