import { M } from '../../../utils/Engine'
import { Component, DefaultProps } from '../../../utils/Component'

interface Props extends DefaultProps<Props> {}

export class View extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create(
            'section',
            { className: this.getClassNames() },
            ...children
        )
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('View', className)
    }
}
