import { resetHook } from '../../utils/reset'
import { PageHeader } from '../../components/Chrome/PageHeader'
import { CharacterDetailView } from '../../views/CharacterDetailView'

export function handleCharacterDetailRoute(hook: HTMLElement) {
    return async function(args: number) {
        resetHook(hook)
        new PageHeader({ hook, title: `Character detail` })

        new CharacterDetailView({ hook, id: args })
    }
}
