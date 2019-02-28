import { Component, DefaultProps } from '../../../utils/Component'
import { M } from '../../../utils/Engine'

export interface ListItemProps extends DefaultProps<ListItemProps> {}

export class ListItem extends Component<ListItemProps> {
    constructor(private props: ListItemProps) {
        super(props)
    }

    public render = () => {
        const { children } = this.props

        return M.create(
            'li',
            { className: this.getClassNames() },
            ...children
        )
    }

    private getClassNames() {
        const { className } = this.props

        return M.getClassName('ListItem', className)
    }
}
