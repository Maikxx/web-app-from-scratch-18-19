import { fetchCharacters } from '../fetchers/character'
import { Character } from '../types/Character'
import { PageHeader } from '../components/Chrome/PageHeader'
import { CharacterButton } from '../components/Character/CharacterButton'
import { View } from '../components/Core/View'
import { sortByObjectKey } from '../utils/sortByObjectKey'
import Navigo from 'navigo'

interface Props {
    hook: HTMLElement
    router: Navigo
}

export class CharacterMasterView {
    constructor(private props: Props) {
        (async () => {
            let characters

            try {
                characters = await fetchCharacters()
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }

            this.render(characters)
        })()
    }

    public render(characters: Character[]) {
        const { hook, router } = this.props

        if (characters && characters.length > 0) {
            new PageHeader({ hook, title: `Game of Thrones Characters` })

            const listElement = document.createElement('ol')
            characters
                .sort(sortByObjectKey<Character>('name'))
                .forEach(character => new CharacterButton({ hook: listElement, router, character }))

            hook.appendChild(listElement)
            new View(hook)
        }
    }
}
