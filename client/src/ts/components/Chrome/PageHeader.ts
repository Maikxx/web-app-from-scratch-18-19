import Navigo from 'navigo'
import { M } from '../../utils/Engine'
import { Component } from '../../utils/Component'
import { Search } from '../Core/DataEntry/Search'

interface Props {
    onSearch?: (event: Event) => void
    title: string
    router: Navigo
}

export class PageHeader extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { title, router, onSearch } = this.props

        return M.create('header', { class: 'PageHeader' }, ...[
            M.create('a', { 'event:click': () => router.navigate('/') }, 'Game of Thrones'),
            M.create('h1', { }, title),
            (onSearch && new Search({ onSearch, className: 'PageHeader__search' })),
        ])
    }
}
