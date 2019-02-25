import { M } from '../../../utils/Engine'
import { Component, DefaultProps } from '../../../utils/Component'
import { Transformer } from '../../../utils/Transformer'

interface Props extends DefaultProps<Props> {}

export class View extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create(
            'section',
            { 'classList:add': this.getClassNames() },
            ...children
        )
    }

    private getClassNames() {
        const { className } = this.props

        return Transformer.getClassName('View', className)
    }
}
