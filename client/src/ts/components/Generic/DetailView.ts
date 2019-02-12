import { PageHeader } from '../Chrome/PageHeader'
import { DataList } from './DataList'
import { DetailFetcherData } from '../../types/Fetchers'
import { Fetcher } from '../Core/Fetcher'
import Navigo from 'navigo'
import { M } from '../Core/Engine'

interface Props {
    host: HTMLElement
    router: Navigo
    url: string
}

export class DetailView {
    constructor(private props: Props) {
        const { url } = this.props

        ; (async () => {
            try {
                const data = await new Fetcher({ url }).fetch() as DetailFetcherData
                this.render(data)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()
    }

    public render(data: DetailFetcherData) {
        const { host, router } = this.props

        M.render(new PageHeader({ title: data.name, router }), host)
        M.render(new DataList({ data, router }), host)
    }
}
