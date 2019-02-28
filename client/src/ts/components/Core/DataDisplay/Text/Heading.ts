import { Component, DefaultProps } from '../../../../utils/Component'
import { M } from '../../../../utils/Engine'

interface Props extends DefaultProps<Props> {
    level: number
}

export class Heading extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create(this.getComponentType(), {
            className: this.getClassNames(),
        }, ...children)
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('Heading', className)
    }

    private getComponentType() {
        const { level } = this.props

        return `h${level}`
    }
}
