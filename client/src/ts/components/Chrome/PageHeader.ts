import Navigo from 'navigo'
import { M } from '../../utils/Engine'
import { Component } from '../../utils/Component'
import { Search } from '../Core/DataEntry/Search'
import { Anchor } from '../Core/DataDisplay/Text/Anchor'
import { Heading } from '../Core/DataDisplay/Text/Heading'

interface Props {
    onSearch?: (event: Event) => void
    router: Navigo
    title: string
}

export class PageHeader extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { title, router, onSearch } = this.props

        return M.create('header', { class: 'PageHeader' }, ...[
            new Anchor({
                onClick: () => router.navigate('/'),
                children: ['Game of Thrones'],
            }),
            new Heading({
                level: 1,
                children: [title],
            }),
            (onSearch && new Search({
                onSearch,
                className: 'PageHeader__search',
            })),
        ])
    }
}
