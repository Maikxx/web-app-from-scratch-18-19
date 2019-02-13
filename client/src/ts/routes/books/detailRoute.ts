import { BookDetailView } from '../../views/BookDetailView'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'

interface Args {
    id: string
}

export function handleBookDetailRoute(host: HTMLElement, router: Navigo) {
    return function(args: Args) {
        M.resetComponent(host)
        new BookDetailView({ host, id: args.id, router })
    }
}
