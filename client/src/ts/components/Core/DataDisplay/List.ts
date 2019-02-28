import { Component, DefaultProps } from '../../../utils/Component'
import { M } from '../../../utils/Engine'

interface Props extends DefaultProps<Props> {
    isOrdered?: boolean
}

export class List extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create(
            this.getListType(),
            { className: this.getClassNames() },
            ...children
        )
    }

    private getListType() {
        const { isOrdered } = this.props

        return isOrdered
            ? 'ol'
            : 'ul'
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('List', className)
    }
}
