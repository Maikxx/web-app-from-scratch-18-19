import { resetHook } from '../../utils/reset'
import { Router } from '../../components/Core/Router'
import { HouseDetailView } from '../../views/HouseDetailView'

export function handleHouseDetailRoute(hook: HTMLElement, router: Router) {
    return function(args: number) {
        resetHook(hook)
        new HouseDetailView({ hook, id: args, router })
    }
}
