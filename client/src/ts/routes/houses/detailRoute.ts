import { resetHook } from '../../utils/reset'
import { HouseDetailView } from '../../views/HouseDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleHouseDetailRoute(hook: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHook(hook)
        new HouseDetailView({ hook, id: args.id, router })
    }
}
