import { resetHost } from '../../utils/reset'
import { HouseDetailView } from '../../views/HouseDetailView'
import Navigo from 'navigo'

interface Args {
    id: string
}

export function handleHouseDetailRoute(host: HTMLElement, router: Navigo) {
    return function(args: Args) {
        resetHost(host)
        new HouseDetailView({ host, id: args.id, router })
    }
}
