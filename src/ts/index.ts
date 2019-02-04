import 'babel-polyfill'
import { Store } from './utils/store'
import { createCharacterButton } from './components/Character/CharacterButton'
import { sortCharactersByName } from './sorters/sortCharactersByName'
import { fetchCharacters } from './fetchers/character'
import { Router } from './utils/Router'
import { PageHeader } from './components/Chrome/PageHeader'
import { View } from './components/Core/View'

(async() => {
    const store = new Store()
    const router = new Router()
    const mainElement = document.querySelector('main') as HTMLMainElement
    const view = new View().render()

    router.navigate()

    router.addRoute(/characters/, () => {
        console.log('Characters')
    })

    router.watch()

    let characters

    try {
        characters = await fetchCharacters()
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }

    if (characters && characters.length > 0) {
        new PageHeader(mainElement, { title: `Game of Thrones Characters` }).render()

        const listElement = document.createElement('ol')
        characters
            .sort(sortCharactersByName)
            .forEach(createCharacterButton(store, view, listElement))

        mainElement.appendChild(listElement)
        mainElement.appendChild(view)
    }
})()
