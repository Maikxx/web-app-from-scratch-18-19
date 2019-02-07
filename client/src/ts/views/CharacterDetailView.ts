import { Character } from '../types/Character'
import { fetchByUrl } from '../fetchers/generic'
import { PageHeader } from '../components/Chrome/PageHeader'
import { Router } from '../components/Core/Router'
import { DataList } from '../components/Generic/DataList'

interface Props {
    hook: HTMLElement
    id: number
    router: Router
}

export class CharacterDetailView {
    constructor(private props: Props) {
        const { id } = this.props

        ; (async () => {
            const url = `https://anapioficeandfire.com/api/characters/${id}`
            try {
                const character = await fetchByUrl<Character>(url)
                this.render(character)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()
    }

    public render(character: Character) {
        const { hook, router } = this.props

        new PageHeader({ hook, title: character.name })
        new DataList({ hook, router, data: character })
    }
}
