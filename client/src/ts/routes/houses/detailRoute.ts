import { HouseDetailView } from '../../views/HouseDetailView'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'

interface Args {
    id: string
}

export function handleHouseDetailRoute(host: HTMLElement, router: Navigo) {
    return function(args: Args) {
        M.resetComponent(host)
        new HouseDetailView({ host, id: args.id, router })
    }
}
