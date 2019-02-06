import { resetHook } from '../../utils/reset'
import { Router } from '../../components/Core/Router'
import { BookDetailView } from '../../views/BookDetailView'

export function handleBookDetailRoute(hook: HTMLElement, router: Router) {
    return function(args: number) {
        resetHook(hook)
        new BookDetailView({ hook, id: args, router })
    }
}
