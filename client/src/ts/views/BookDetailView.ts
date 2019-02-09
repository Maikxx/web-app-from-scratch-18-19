import { Router } from '../components/Core/Router'
import { DetailView } from '../components/Generic/DetailView'

interface Props {
    hook: HTMLElement
    id: number
    router: Router
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
