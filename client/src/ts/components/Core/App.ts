import { routes } from '../../routes'
import { handleCharacterIndexRoute } from '../../routes/characters/indexRoute'
import { handleCharacterDetailRoute } from '../../routes/characters/detailRoute'
import { handleHouseDetailRoute } from '../../routes/houses/detailRoute'
import { handleBookDetailRoute } from '../../routes/books/detailRoute'
import Navigo from 'navigo'

export class App {
    private mainElement = document.querySelector('main') as HTMLMainElement

    constructor() {
        this.initializeRouter()
    }

    private initializeRouter() {
        const router = new Navigo(null, true, '#')

        router.on({
            [routes.characters.detail]: handleCharacterDetailRoute(this.mainElement, router),
            [routes.characters.index]: handleCharacterIndexRoute(this.mainElement, router),
            [routes.houses.detail]: handleHouseDetailRoute(this.mainElement, router),
            [routes.books.detail]: handleBookDetailRoute(this.mainElement, router),
        }).resolve()
    }
}
