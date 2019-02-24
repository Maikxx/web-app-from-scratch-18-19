import { PageHeader } from '../Chrome/PageHeader'
import { DataList } from './DataList'
import { DetailFetcherData } from '../../types/Fetchers'
import { Fetcher } from '../../utils/Fetcher'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'
import { View } from '../Core/DataDisplay/View'

interface Props {
    host: HTMLElement
    router: Navigo
    url: string
}

export class DetailView {
    constructor(private props: Props) {
        this.initializeFetcher()
    }

    public render(data: DetailFetcherData) {
        const { host, router } = this.props

        M.render(new View({ children: [
            new PageHeader({ title: data.name, router }),
            new DataList({ data, router, loaderRoot: host }),
        ]}), host)
    }

    private async initializeFetcher() {
        const { url, host } = this.props

        try {
            M.toggleLoader(host)
            const data = await new Fetcher({ url }).fetch() as DetailFetcherData
            this.render(data)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
