import { M } from '../../../utils/Engine'
import { Component } from '../../../utils/Component'
import { Transformer } from '../../../utils/Transformer'

interface Props {
    children: (string | HTMLElement | Component)[]
    className?: string
}

export class View extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { children, className } = this.props

        return M.create(
            'section',
            { 'classList:add': Transformer.getClassName('View', className) },
            ...children
        )
    }
}
