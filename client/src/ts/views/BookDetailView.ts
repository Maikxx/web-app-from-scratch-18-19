import { DetailView } from '../components/Generic/DetailView'
import Navigo from 'navigo'

interface Props {
    hook: HTMLElement
    id: string
    router: Navigo
}

export class BookDetailView {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { hook, router, id } = this.props
        const url = `https://anapioficeandfire.com/api/books/${id}`

        new DetailView({ router, hook, url })
    }
}
