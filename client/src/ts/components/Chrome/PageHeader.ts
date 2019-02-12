import Navigo from 'navigo'
import { M } from '../Core/TemplateEngine'
import { Component } from '../Core/Component'

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

        return M.createElement(
            'header',
            { class: 'PageHeader' },
            ...[
                M.createElement(
                    'a',
                    { 'event:click': () => router.navigate('/') },
                    'Game of Thrones'
                ),
                M.createElement(
                    'h1',
                    { },
                    title
                ),
            ]
        )
    }
}
