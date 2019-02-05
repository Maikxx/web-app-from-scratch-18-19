import 'babel-polyfill'
import { CharacterButton } from './components/Character/CharacterButton'
import { sortCharactersByName } from './sorters/sortCharactersByName'
import { fetchCharacters } from './fetchers/character'
import { Router } from './utils/Router'
import { PageHeader } from './components/Chrome/PageHeader'
import { View } from './components/Core/View'
import { CharacterDetailView } from './views/CharacterDetailView'

(async() => {
    const router = new Router()
    const mainElement = document.querySelector('main') as HTMLMainElement
    const view = new View().render()

    router.redirect()

    router.addRoute(/characters$/, async () => {
        let characters

        try {
            characters = await fetchCharacters()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

        if (characters && characters.length > 0) {
            new PageHeader({ hook: mainElement, title: `Game of Thrones Characters` }).render()

            const listElement = document.createElement('ol')
            characters
                .sort(sortCharactersByName)
                .forEach(character => new CharacterButton({ hook: listElement, router, character }).render())

            mainElement.appendChild(listElement)
            mainElement.appendChild(view)
        }
    })

    router.addRoute(/characters\/(.*)/, async (args?: any) => {
        mainElement.innerHTML = ''
        console.log(mainElement.innerHTML)
        console.log(mainElement)
        new PageHeader({ hook: mainElement, title: `Character detail` }).render()
        await CharacterDetailView(mainElement, args)
    })

    router.watch()
    router.redirect('/characters')
})()
