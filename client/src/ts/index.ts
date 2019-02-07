import 'babel-polyfill'
import { Router } from './components/Core/Router'
import { routes } from './routes'
import { handleCharacterIndexRoute } from './routes/characters/indexRoute'
import { handleCharacterDetailRoute } from './routes/characters/detailRoute'
import { handleHouseDetailRoute } from './routes/houses/detailRoute'
import { handleBookDetailRoute } from './routes/books/detailRoute'

(async() => {
    const router = new Router()
    const mainElement = document.querySelector('main') as HTMLMainElement

    const currentPath = router.getPath()
    const redirectTo = currentPath
        ? currentPath
        : '/characters'

    router.redirect(redirectTo)

    router.addRoute(new RegExp(routes.characters.index), handleCharacterIndexRoute(mainElement, router))
    router.addRoute(new RegExp(routes.characters.detail), handleCharacterDetailRoute(mainElement, router))
    router.addRoute(new RegExp(routes.houses.detail), handleHouseDetailRoute(mainElement, router))
    router.addRoute(new RegExp(routes.books.detail), handleBookDetailRoute(mainElement, router))

    router.watch()
    router.check()
})()
