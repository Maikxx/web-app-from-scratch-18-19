import { Component, DefaultProps } from '../../../../utils/Component'
import { M } from '../../../../utils/Engine'
import { Transformer } from '../../../../utils/Transformer'

interface Props extends DefaultProps<Props> {}

export class Paragraph extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create('p', {
            className: this.getClassNames(),
        }, ...children)
    }

    private getClassNames() {
        const { className } = this.props

        return Transformer.getClassName('Paragraph', className)
    }
}
