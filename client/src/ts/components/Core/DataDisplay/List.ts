import { Component } from '../../../utils/Component'
import { M } from '../../../utils/Engine'
import { Transformer } from '../../../utils/Transformer'

interface Props {
    className?: string
    children: (string | HTMLElement | Component)[]
    isOrdered?: boolean
}

export class List extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { children, className } = this.props

        return M.create(
            this.getListType(),
            { 'classList:add': Transformer.getClassName('List', className) },
            ...children
        )
    }

    private getListType = () => {
        const { isOrdered } = this.props

        return isOrdered
            ? 'ol'
            : 'ul'
    }
}
