import { Component } from '../../../utils/Component'
import { M } from '../../../utils/Engine'

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
            { className: this.getClassName() },
            ...[
                this.renderInput(),
            ]
        )
    }

    private renderInput() {
        const { onSearch, placeholder } = this.props
        const inputProperties = {
            className: 'Search__input',
            'event:keyup': onSearch,
            placeholder: placeholder || 'Search...',
        }

        return M.create('input', inputProperties)
    }

    private getClassName() {
        const { className } = this.props

        return M.getClassName('Search', className)
    }
}
