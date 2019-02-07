import { fetchByUrl } from '../fetchers/generic'
import { PageHeader } from '../components/Chrome/PageHeader'
import { Router } from '../components/Core/Router'
import { Book } from '../types/Book'
import { DataList } from '../components/Generic/DataList'

interface Props {
    hook: HTMLElement
    id: number
    router: Router
}

export class BookDetailView {
    constructor(private props: Props) {
        const { id } = this.props

        ; (async () => {
            const url = `https://anapioficeandfire.com/api/books/${id}`
            try {
                const book = await fetchByUrl<Book>(url)
                this.render(book)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()
    }

    public render(book: Book) {
        const { hook, router } = this.props

        new PageHeader({ hook, title: book.name })
        new DataList({ hook, data: book, router })
    }
}
