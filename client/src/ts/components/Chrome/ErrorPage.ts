import Navigo from 'navigo'
import { Component } from '../../utils/Component'
import { View } from '../Core/DataDisplay/View'
import { Paragraph } from '../Core/DataDisplay/Text/Paragraph'
import { Anchor } from '../Core/DataDisplay/Text/Anchor'
import { routes } from '../../routes'

interface Props {
    router: Navigo
}

export class ErrorPage extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { router } = this.props

        return new View({
            children: [
                new Paragraph({
                    children: ['This is probably not where you want to be at right now!'],
                    className: 'ErrorPage__text',
                }),
                new Anchor({
                    children: ['You can go back to the application by clicking here.'],
                    onClick: () => router.navigate(routes.index),
                    className: 'ErrorPage__link',
                }),
            ],
            className: 'ErrorPage',
        }).render()
    }
}
