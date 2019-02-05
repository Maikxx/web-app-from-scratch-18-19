import { resetHook } from '../../utils/reset'
import { PageHeader } from '../../components/Chrome/PageHeader'
import { CharacterDetailView } from '../../views/CharacterDetailView'

export function handleCharacterDetailRoute(hook: HTMLElement) {
    return async function(args?: any) {
        resetHook(hook)
        new PageHeader({ hook, title: `Character detail` }).render()
        await CharacterDetailView(hook, args)
    }
}
