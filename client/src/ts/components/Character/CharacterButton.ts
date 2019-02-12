import { Character } from '../../types/Character'
import { capitalize } from '../../utils/capitalize'
import Navigo from 'navigo'
import { M } from '../Core/Engine'
import { Component } from '../Core/Component'

interface Props {
    router: Navigo
    character: Character
}

export class CharacterButton extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = () => {
        const { character } = this.props
        const { name } = character

        if (!name || !name.length) {
            return null
        }

        return M.create(
            'li',
            {},
            ...[
                M.create(
                    'button',
                    {
                        'classList:add': 'nav-link',
                        'event:click': this.handleLinkClickEvent,
                    },
                    capitalize(name)
                ),
            ]
        )
    }

    private handleLinkClickEvent = () => {
        const { character, router } = this.props
        const { url } = character
        const index = url.slice(url.lastIndexOf('/') + 1)

        router.navigate(`/characters/${index}`)
    }
}
