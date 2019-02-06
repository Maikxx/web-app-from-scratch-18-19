import 'babel-polyfill'
import { Router } from './components/Core/Router'
import { routes } from './routes'
import { handleCharacterIndexRoute } from './routes/characters/indexRoute'
import { handleCharacterDetailRoute } from './routes/characters/detailRoute'

(async() => {
    const router = new Router()
    const mainElement = document.querySelector('main') as HTMLMainElement

    const currentPath = router.getPath()
    const redirectTo = currentPath
        ? currentPath
        : '/characters'

    router.redirect(redirectTo)
    router.addRoute(new RegExp(routes.characters.index), handleCharacterIndexRoute(mainElement, router))
    router.addRoute(new RegExp(routes.characters.detail), handleCharacterDetailRoute(mainElement))
    router.watch()
    router.check()
})()
