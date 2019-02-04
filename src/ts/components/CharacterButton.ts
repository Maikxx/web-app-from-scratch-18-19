import { Character } from '../types/Character'
import { capitalize } from '../utils/capitalize'
import { setNewRoute } from '../utils/routing'
import { CharacterDetailView } from '../views/CharacterDetailView'
import { Store } from '../utils/store'

export function createCharacterButton(store: Store, hook: HTMLElement, listElement: HTMLElement) {
    return function (character: Character) {
        const { name, url } = character

        if (!name || !name.length) {
            return
        }

        const listItemElement = document.createElement('li')
        const linkElement = document.createElement('button')

        linkElement.classList.add('nav-link')
        linkElement.innerText = capitalize(name)

        linkElement.addEventListener('click', handleLinkClickEvent(store, hook, url))

        listItemElement.appendChild(linkElement)
        listElement.appendChild(listItemElement)
    }
}

function handleLinkClickEvent(store: Store, hook: HTMLElement, url: string) {
    return function (event: MouseEvent) {
        const index = url.slice(url.lastIndexOf('/') + 1)

        setNewRoute({ url }, `character/${index}`)

        if (store.get('url') !== window.location.href) {
            hook.innerHTML = ''
            CharacterDetailView(hook)
        }
    }
}
