import { Component, DefaultProps } from '../../../../utils/Component'
import { M } from '../../../../utils/Engine'
import { Transformer } from '../../../../utils/Transformer'

interface Props extends DefaultProps<Props> {
    onClick?: (event: Event) => void
}

export class Anchor extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { onClick, children } = this.props

        return M.create('a', {
            'event:click': onClick,
            'classList:add': this.getClassNames(),
        }, ...children)
    }

    private getClassNames() {
        const { className } = this.props

        return Transformer.getClassName('Anchor', className)
    }
}
