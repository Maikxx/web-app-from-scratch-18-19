import { M } from '../../../utils/Engine'
import { Component } from '../../../utils/Component'
import { Transformer } from '../../../utils/Transformer'

interface Props {
    className?: string
}

export class Loader extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        return M.create('i', { 'classList:add': this.getClassNames() })
    }

    private getClassNames() {
        const { className } = this.props

        return Transformer.getClassName('Loader', className)
    }
}
