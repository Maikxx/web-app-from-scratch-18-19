import Navigo from 'navigo'
import { M, Component } from '../Core/Engine'

interface Props {
    title: string
    router: Navigo
}

export class PageHeader extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { title, router } = this.props

        return M.create(
            'header',
            { class: 'PageHeader' },
            ...[
                M.create(
                    'a',
                    { 'event:click': () => router.navigate('/') },
                    'Game of Thrones'
                ),
                M.create(
                    'h1',
                    { },
                    title
                ),
            ]
        )
    }
}
