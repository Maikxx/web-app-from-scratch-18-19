import { routes } from './routes'
import { handleCharacterIndexRoute } from './routes/characters/indexRoute'
import { handleCharacterDetailRoute } from './routes/characters/detailRoute'
import { handleHouseDetailRoute } from './routes/houses/detailRoute'
import { handleBookDetailRoute } from './routes/books/detailRoute'
import Navigo from 'navigo'
import { LocalStorageService } from './utils/LocalStorageService'
import { handleErrorRoute } from './routes/error'

export class App {
    constructor() {
        new LocalStorageService().initialize()
        this.initializeRouter()
    }

    private initializeRouter() {
        const mainElement = document.querySelector('main') as HTMLElement
        const router = new Navigo(null, true, '#')

        if (!mainElement) {
            handleErrorRoute(mainElement, router)

            throw new Error(`
                Root element not found in the document.${` `}
                You might have forgotten to change the root element or it is not yet loaded.
            `)
        }

        try {
            router
                .on({
                    [routes.characters.detail]: handleCharacterDetailRoute(mainElement, router),
                    [routes.houses.detail]: handleHouseDetailRoute(mainElement, router),
                    [routes.books.detail]: handleBookDetailRoute(mainElement, router),
                    [routes.characters.index]: handleCharacterIndexRoute(mainElement, router),
                })
                .notFound(handleErrorRoute(mainElement, router))

            router.resolve()
        } catch (error) {
            handleErrorRoute(mainElement, router)

            console.error(error)
            throw new Error(error)
        }
    }
}
