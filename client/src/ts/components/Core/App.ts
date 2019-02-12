import { routes } from '../../routes'
import { handleCharacterIndexRoute } from '../../routes/characters/indexRoute'
import { handleCharacterDetailRoute } from '../../routes/characters/detailRoute'
import { handleHouseDetailRoute } from '../../routes/houses/detailRoute'
import { handleBookDetailRoute } from '../../routes/books/detailRoute'
import Navigo from 'navigo'

export class App {
    constructor() {
        this.initializeRouter()
    }

    private initializeRouter() {
        const mainElement = document.querySelector('main') as HTMLElement
        const router = new Navigo(null, true, '#')

        if (!mainElement) {
            return
        }

        try {
            router.on({
                [routes.characters.detail]: handleCharacterDetailRoute(mainElement, router),
                [routes.characters.index]: handleCharacterIndexRoute(mainElement, router),
                [routes.houses.detail]: handleHouseDetailRoute(mainElement, router),
                [routes.books.detail]: handleBookDetailRoute(mainElement, router),
            }).resolve()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
