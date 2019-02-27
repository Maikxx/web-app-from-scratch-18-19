import { DetailView } from '../components/Generic/DetailView'
import Navigo from 'navigo'
import { LocalStorageService } from '../utils/LocalStorageService'

interface Props {
    host: HTMLElement
    id: string
    router: Navigo
}

export class BookDetailView {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { host, router, id } = this.props

        new DetailView({ router, host, id, localStorageKey: LocalStorageService.booksKey })
    }
}
