import { M } from '../../../utils/Engine'
import { Component } from '../../../utils/Component'

interface Props {
    className?: string
}

export class Loader extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        return M.create('i', { className: this.getClassNames() })
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('Loader', className)
    }
}
