import { fetchCharacters } from '../fetchers/character'
import { Character } from '../types/Character'
import { PageHeader } from '../components/Chrome/PageHeader'
import { CharacterButton } from '../components/Character/CharacterButton'
import { View } from '../components/Generic/View'
import { Sorter } from '../utils/Sorter'
import Navigo from 'navigo'
import { M } from '../utils/Engine'
import { Filter } from '../utils/Filter'

interface Props {
    host: HTMLElement
    router: Navigo
}

export class CharacterMasterView {
    constructor(private props: Props) {
        (async () => {
            let characters

            try {
                characters = await fetchCharacters()
                console.log(characters)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }

            this.render(characters)
        })()
    }

    public render(characters: Character[]) {
        const { host, router } = this.props

        if (characters && characters.length > 0) {
            M.render(new PageHeader({ title: `Game of Thrones Characters`, router }), host)
            const uniqueCharacters = Filter.getUniqueArrayByObjectKey<Character>(characters, 'name')
            const buttons = uniqueCharacters
                .sort(Sorter.sortByObjectKey<Character>('name'))
                .map(character => new CharacterButton({ router, character }))

            M.render(new View({ children: [M.create('ol', {}, ...buttons)]}), host)
        }
    }
}
