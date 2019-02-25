import { Character } from '../../types/Character'
import Navigo from 'navigo'
import { Transformer } from '../../utils/Transformer'
import { Component } from '../../utils/Component'
import { Button } from '../Core/DataDisplay/Button'
import { ListItem } from '../Core/DataDisplay/ListItem'

interface Props {
    router: Navigo
    character: Character
}

export class CharacterButton extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = () => {
        const { character } = this.props
        const { name } = character

        if (!name || name.length === 0) {
            return null
        }

        return new ListItem({
            children: [
                new Button({
                    onClick: this.handleLinkClickEvent.bind(this),
                    className: 'CharacterButton',
                    children: [Transformer.capitalize(name)],
                }),
            ],
        }).render()
    }

    private handleLinkClickEvent = () => {
        const { character, router } = this.props
        const { url } = character
        const index = url.slice(url.lastIndexOf('/') + 1)

        router.navigate(`/characters/${index}`)
    }
}
