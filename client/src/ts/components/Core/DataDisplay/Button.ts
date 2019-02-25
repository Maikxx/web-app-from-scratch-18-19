import { Component, DefaultProps } from '../../../utils/Component'
import { M } from '../../../utils/Engine'
import { Transformer } from '../../../utils/Transformer'

interface Props extends DefaultProps<Props> {
    onClick?: (event: Event) => void
}

export class Button extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children, onClick } = this.props

        return M.create('button', {
            'classList:add': this.getClassNames(),
            ...(onClick ? { 'event:click': onClick } : null),
        }, ...children)
    }

    private getClassNames() {
        const { className } = this.props

        return Transformer.getClassName('Button', className)
    }
}
