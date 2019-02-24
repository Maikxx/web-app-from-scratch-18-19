import { Component } from '../../utils/Component'
import { M } from '../../utils/Engine'
import { Transformer } from '../../utils/Transformer'

interface Props {
    className?: string
    onSearch: (event: Event) => void
}

export class Search extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { className } = this.props

        return M.create(
            'label',
            { 'classList:add': Transformer.getClassName('Search', className) },
            ...[
                this.renderInput(),
            ]
        )
    }

    private renderInput = () => {
        const { onSearch } = this.props
        const inputProperties = {
            'classList:add': 'Search__input',
            'event:keyup': onSearch,
            placeholder: 'Search...',
        }

        return M.create('input', inputProperties)
    }
}
