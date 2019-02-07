import { Character } from '../../types/Character'
import { capitalize } from '../../utils/capitalize'
import { Router } from '../Core/Router'

interface Props {
    router: Router
    character: Character
    hook: HTMLElement
}

export class CharacterButton {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { character, hook } = this.props
        const { name } = character

        if (!name || !name.length) {
            return
        }

        const listItemElement = document.createElement('li')
        const linkElement = document.createElement('button')

        linkElement.classList.add('nav-link')
        linkElement.innerText = capitalize(name)

        linkElement.addEventListener('click', this.handleLinkClickEvent)

        listItemElement.appendChild(linkElement)
        hook.appendChild(listItemElement)
    }

    private handleLinkClickEvent = () => {
        const { character, router } = this.props
        const { url } = character
        const index = url.slice(url.lastIndexOf('/') + 1)

        router.redirect(`/characters/${index}`)
    }
}
