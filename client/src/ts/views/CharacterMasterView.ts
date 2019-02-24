import { fetchCharacters } from '../fetchers/character'
import { Character } from '../types/Character'
import { PageHeader } from '../components/Chrome/PageHeader'
import { CharacterButton } from '../components/Character/CharacterButton'
import { View } from '../components/Core/DataDisplay/View'
import { Sorter } from '../utils/Sorter'
import Navigo from 'navigo'
import { M } from '../utils/Engine'
import { Filter } from '../utils/Filter'
import { InfiniteScroll } from '../utils/InfiniteScroll'
import { List } from '../components/Core/DataDisplay/List'

interface Props {
    host: HTMLElement
    router: Navigo
}

interface FetchCharactersProps {
    pageSize: number
    currentPage: number
    searchText?: string
}

export class CharacterMasterView {
    private currentPage = 1
    private PAGE_SIZE = 50
    private previousSearchValue = ''
    private infiniteScroll: InfiniteScroll

    constructor(private props: Props) {
        const { host } = this.props

        ; (async() => {
            await this.initializeFetch()
            this.infiniteScroll = new InfiniteScroll({
                root: host.querySelector('.InfiniteScrollList'),
                onLoadMore: this.onLoadMore.bind(this),
                pageSize: this.PAGE_SIZE,
            })
        })()
    }

    public render(characters: Character[]) {
        const { host, router } = this.props

        if (characters && characters.length > 0) {
            M.render(
                new PageHeader({
                    title: `Game of Thrones Characters`,
                    router,
                    onSearch: this.onSearch.bind(this),
                }),
                host
            )

            M.render(
                new View({
                    children: [
                        new List({
                            className: 'InfiniteScrollList',
                            children: this.getCharacterButtons(characters),
                        }),
                    ],
                }),
                host
            )
        }
    }

    private async onLoadMore() {
        const { host } = this.props

        const newCharacters = await this.fetchCharacters({
            pageSize: this.PAGE_SIZE,
            currentPage: this.currentPage,
        })
        const list = host.querySelector('.InfiniteScrollList')
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
        const characters = await this.fetchCharacters({
            pageSize: this.PAGE_SIZE,
            currentPage: 1,
        })

        this.render(characters)
    }

    private async fetchCharacters({ pageSize, currentPage, searchText }: FetchCharactersProps) {
        const { host } = this.props
        let newCharacters = []

        try {
            M.toggleLoader(host)
            newCharacters = await fetchCharacters(pageSize, currentPage, searchText)
            M.toggleLoader(host)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

        return newCharacters
    }

    private async onSearch({ target }: Event) {
        const { host } = this.props

        if (!target) {
            return
        }

        const value = (target as HTMLInputElement).value

        if (value === this.previousSearchValue) {
            return
        }

        this.currentPage = 1
        const searchedCharacters = await this.fetchCharacters({
            pageSize: this.PAGE_SIZE,
            currentPage: this.currentPage,
            searchText: value,
        })
        const list = host.querySelector('.InfiniteScrollList')

        if (!list) {
            return
        }

        list.innerHTML = ''
        const buttons = this.getCharacterButtons(searchedCharacters)
        await Promise.all(buttons.map(button => {
            M.render(button, list)
        }))

        if (!value) {
            this.infiniteScroll.updateObservable()
            return
        }

        this.previousSearchValue = value
    }
}
