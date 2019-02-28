import { Component, DefaultProps } from '../../../utils/Component'
import { M } from '../../../utils/Engine'

interface Props extends DefaultProps<Props> {}

export class Header extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create('header', {
            className: this.getClassNames(),
        }, ...children)
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('Header', className)
    }
}
