import Navigo from 'navigo'
import { M } from '../utils/Engine'
import { ErrorPage } from '../components/Chrome/ErrorPage'

export function handleErrorRoute(host: HTMLElement, router: Navigo) {
    return function() {
        M.resetComponent(host)

        M.render(new ErrorPage({ router }), host)
    }
}
