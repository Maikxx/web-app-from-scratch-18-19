import { resetHost } from '../../utils/reset'
import { BookDetailView } from '../../views/BookDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleBookDetailRoute(host: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHost(host)
        new BookDetailView({ host, id: args.id, router })
    }
}
