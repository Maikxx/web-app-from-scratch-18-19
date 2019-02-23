import { fetchCharacters } from '../fetchers/character'
import { Character } from '../types/Character'
import { PageHeader } from '../components/Chrome/PageHeader'
import { CharacterButton } from '../components/Character/CharacterButton'
import { View } from '../components/Generic/View'
import { Sorter } from '../utils/Sorter'
import Navigo from 'navigo'
import { M } from '../utils/Engine'
import { Filter } from '../utils/Filter'
import { InfiniteScroll } from '../utils/InfiniteScroll'

interface Props {
    host: HTMLElement
    router: Navigo
}

interface FetchCharactersProps {
    pageSize: number,
    currentPage: number,
    host: HTMLElement
}

export class CharacterMasterView {
    private currentPage = 1
    private PAGE_SIZE = 50

    constructor(private props: Props) {
        const { host } = this.props

        ; (async() => {
            await this.initializeFetch()
            new InfiniteScroll({
                root: host.querySelector('.infinite-scroll-list'),
                onLoadMore: this.onLoadMore.bind(this),
                pageSize: this.PAGE_SIZE,
            })
        })()
    }

    public render(characters: Character[]) {
        const { host, router } = this.props

        if (characters && characters.length > 0) {
            M.render(new PageHeader({ title: `Game of Thrones Characters`, router }), host)
            const buttons = this.getCharacterButtons(characters)
            M.render(new View({ children: [M.create('ol', { 'classList:add': 'infinite-scroll-list' }, ...buttons)]}), host)
        }
    }

    private async onLoadMore() {
        const { host } = this.props

        const newCharacters = await this.fetchCharacters({ pageSize: this.PAGE_SIZE, currentPage: this.currentPage, host })
        const list = host.querySelector('.infinite-scroll-list')
        const buttons = this.getCharacterButtons(newCharacters)

        if (!list) {
            return
        }

        buttons.forEach(button => {
            M.render(button, list)
        })

        this.currentPage++
    }

    private getCharacterButtons(characters: Character[]) {
        const { router } = this.props

        const uniqueCharacters = Filter.getUniqueArrayByObjectKey<Character>(characters, 'name')
        return uniqueCharacters
            .sort(Sorter.sortByObjectKey<Character>('name'))
            .map(character => new CharacterButton({ router, character }))
    }

    private async initializeFetch() {
        const { host } = this.props
        const characters = await this.fetchCharacters({ pageSize: this.PAGE_SIZE, currentPage: 1, host })

        this.render(characters)
    }

    private async fetchCharacters({ pageSize, currentPage, host }: FetchCharactersProps) {
        let newCharacters = []
        try {
            M.toggleLoader(host)
            newCharacters = await fetchCharacters(pageSize, currentPage)
            M.toggleLoader(host)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
        return newCharacters
    }
}
