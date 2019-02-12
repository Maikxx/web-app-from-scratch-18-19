import { Character } from '../../types/Character'
import { capitalize } from '../../utils/capitalize'
import Navigo from 'navigo'

interface Props {
    router: Navigo
    character: Character
    host: HTMLElement
}

export class CharacterButton {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { character, host } = this.props
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
        host.appendChild(listItemElement)
    }

    private handleLinkClickEvent = () => {
        const { character, router } = this.props
        const { url } = character
        const index = url.slice(url.lastIndexOf('/') + 1)

        router.navigate(`/characters/${index}`)
    }
}
