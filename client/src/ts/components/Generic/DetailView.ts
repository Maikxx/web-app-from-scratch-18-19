import { Router } from '../Core/Router'
import { fetchByUrl } from '../../fetchers/generic'
import { PageHeader } from '../Chrome/PageHeader'
import { DataList } from './DataList'
import { DetailFetcherData } from '../../types/Fetchers'

interface Props {
    hook: HTMLElement
    router: Router
    url: string
}

export class DetailView {
    constructor(private props: Props) {
        const { url } = this.props

        ; (async () => {
            try {
                const data = await fetchByUrl<DetailFetcherData>(url)
                this.render(data)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()

    }

    public render(data: DetailFetcherData) {
        const { hook, router } = this.props

        new PageHeader({ hook, title: data.name })
        new DataList({ hook, data, router })
    }
}
