import { resetHook } from '../../utils/reset'
import { fetchCharacters } from '../../fetchers/character'
import { PageHeader } from '../../components/Chrome/PageHeader'
import { sortCharactersByName } from '../../sorters/sortCharactersByName'
import { CharacterButton } from '../../components/Character/CharacterButton'
import { View } from '../../components/Core/View'
import { Router } from '../../components/Core/Router'

export function handleCharacterIndexRoute(hook: HTMLElement, router: Router) {
    return async function() {
        resetHook(hook)
        const view = new View().render()
        let characters
        try {
            characters = await fetchCharacters()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

        if (characters && characters.length > 0) {
            new PageHeader({ hook, title: `Game of Thrones Characters` }).render()

            const listElement = document.createElement('ol')
            characters
                .sort(sortCharactersByName)
                .forEach(character => new CharacterButton({ hook: listElement, router, character }).render())

            hook.appendChild(listElement)
            hook.appendChild(view)
        }
    }
}
