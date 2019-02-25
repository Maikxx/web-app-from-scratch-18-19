import { Component } from '../../../utils/Component'
import { M } from '../../../utils/Engine'
import { Transformer } from '../../../utils/Transformer'

interface Props {
    className?: string
    placeholder?: string
    onSearch: (event: Event) => void
}

export class Search extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        return M.create(
            'label',
            { 'classList:add': this.getClassName() },
            ...[
                this.renderInput(),
            ]
        )
    }

    private renderInput() {
        const { onSearch, placeholder } = this.props
        const inputProperties = {
            'classList:add': 'Search__input',
            'event:keyup': onSearch,
            placeholder: placeholder || 'Search...',
        }

        return M.create('input', inputProperties)
    }

    private getClassName() {
        const { className } = this.props

        return Transformer.getClassName('Search', className)
    }
}
