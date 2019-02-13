import { M } from '../../utils/Engine'
import { Component } from '../../utils/Component'

interface Props {
    children?: (string | HTMLElement | Component)[]
}

export class View extends Component {
    constructor(private props?: Props) {
        super()
    }

    public render = () => {
        const children = this.props && this.props.children || []

        return M.create('section', { 'classList:add': 'view' }, ...children)
    }
}
