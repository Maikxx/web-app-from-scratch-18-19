import 'babel-polyfill'
import { capitalize } from './utils/capitalize'
import { Store } from './utils/store'
import { setNewRoute } from './utils/routing'
import { Character } from './types/Character'
import { CharacterDetailView } from './views/CharacterDetailView'

(async() => {
    const store = new Store()

    const mainElement = document.querySelector('main') as HTMLMainElement
    const pageHook = document.createElement('section')
    pageHook.classList.add('page')

    const urlRoot = `https://anapioficeandfire.com/api/`
    const characterUrlRoot = `${urlRoot}/characters`
    const charactersUrl = `${characterUrlRoot}/?pageSize=100000`

    const data = await fetch(charactersUrl)
    const characters = await data.json() as Character[]

    if (characters && characters.length > 0) {
        const listElement = document.createElement('ol')

        setupPageHeader('Game of Thrones Characters', mainElement)

        characters
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .forEach(({ name, url }) => {
                if (!name.length) {
                    return
                }

                const listItemElement = document.createElement('li')
                const linkElement = document.createElement('button')

                linkElement.classList.add('nav-link')
                linkElement.innerText = capitalize(name)

                linkElement.addEventListener('click', async event => {
                    const index = url.slice(url.lastIndexOf('/') + 1)

                    setNewRoute({ url }, `character/${index}`)

                    if (store.get('url') !== window.location.href) {
                        pageHook.innerHTML = ''
                        CharacterDetailView(pageHook)
                    }
                })

                listItemElement.appendChild(linkElement)
                listElement.appendChild(listItemElement)
            })

        mainElement.appendChild(listElement)
        mainElement.appendChild(pageHook)
    }
})()

function setupPageHeader(title: string, elementToAppendTo: HTMLElement) {
    const headerElement = document.createElement('header')
    const headingElement = document.createElement('h1')

    headingElement.innerText = title
    headerElement.appendChild(headingElement)
    elementToAppendTo.appendChild(headerElement)
}
