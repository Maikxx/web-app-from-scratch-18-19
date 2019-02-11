import { Router } from './Router'
import { routes } from '../../routes'
import { handleCharacterIndexRoute } from '../../routes/characters/indexRoute'
import { handleCharacterDetailRoute } from '../../routes/characters/detailRoute'
import { handleHouseDetailRoute } from '../../routes/houses/detailRoute'
import { handleBookDetailRoute } from '../../routes/books/detailRoute'

export class App {
    private mainElement = document.querySelector('main') as HTMLMainElement

    constructor() {
        this.initializeRouter()
    }

    private initializeRouter() {
        const router = new Router()

        const currentPath = router.getPath()
        const redirectTo = currentPath
            ? currentPath
            : '/characters'

        router.redirect(redirectTo)

        router.addRoute(new RegExp(routes.characters.index), handleCharacterIndexRoute(this.mainElement, router))
        router.addRoute(new RegExp(routes.characters.detail), handleCharacterDetailRoute(this.mainElement, router))
        router.addRoute(new RegExp(routes.houses.detail), handleHouseDetailRoute(this.mainElement, router))
        router.addRoute(new RegExp(routes.books.detail), handleBookDetailRoute(this.mainElement, router))

        router.watch()
        router.check()
    }
}
