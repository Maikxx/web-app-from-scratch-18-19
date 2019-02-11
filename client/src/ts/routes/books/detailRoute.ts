import { resetHook } from '../../utils/reset'
import { BookDetailView } from '../../views/BookDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleBookDetailRoute(hook: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHook(hook)
        new BookDetailView({ hook, id: args.id, router })
    }
}
