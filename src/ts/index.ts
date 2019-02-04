import 'babel-polyfill'
import { Store } from './utils/store'
import { createCharacterButton } from './components/CharacterButton'
import { createPageHook } from './components/PageHook'
import { sortCharactersByName } from './sorters/sortCharactersByName'
import { createPageHeader } from './components/PageHeader'
import { fetchCharacters } from './fetchers/character'
import { Router } from './utils/Router'

(async() => {
    const store = new Store()
    const router = new Router()
    const mainElement = document.querySelector('main') as HTMLMainElement
    const pageHook = createPageHook()

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
        const listElement = document.createElement('ol')
        createPageHeader('Game of Thrones Characters', mainElement)

        characters
            .sort(sortCharactersByName)
            .forEach(createCharacterButton(store, pageHook, listElement))

        mainElement.appendChild(listElement)
        mainElement.appendChild(pageHook)
    }
})()
