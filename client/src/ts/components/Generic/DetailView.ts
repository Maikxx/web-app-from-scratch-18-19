import { PageHeader } from '../Chrome/PageHeader'
import { DataList } from './DataList'
import { DetailFetcherData } from '../../types/Fetchers'
import { Fetcher } from '../../utils/Fetcher'
import Navigo from 'navigo'
import { M } from '../../utils/Engine'
import { View } from '../Core/DataDisplay/View'
import { LocalStorageService } from '../../utils/LocalStorageService'
import { Transformer } from '../../utils/Transformer'

interface Props {
    host: HTMLElement
    router: Navigo
    localStorageKey: string
    id: string
}

export class DetailView {
    constructor(private props: Props) {
        const { host } = props

        M.toggleLoader(host)
        this.render()
    }

    public render() {
        const { id, localStorageKey } = this.props

        try {
            const localStorageService = new LocalStorageService()
            const existingStorageData = localStorageService.get(localStorageKey)

            if (!existingStorageData || existingStorageData.length === 0) {
                this.onDataNotStored(id, localStorageService)
            } else {
                const currentPageData = existingStorageData.find((result: any) => result.id === id)

                if (!currentPageData) {
                    this.onDataNotStored(id, localStorageService)
                } else {
                    this.renderWithData(currentPageData)
                }
            }
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    private renderWithData(data: any) {
        const { host, router } = this.props

        M.render(new View({ children: [
            new PageHeader({ title: data.name, router }),
            new DataList({ data, router, loaderRoot: host }),
        ]}), host)
    }

    private async onDataNotStored(id: string, localStorageService: LocalStorageService) {
        const { localStorageKey } = this.props
        const url = `https://anapioficeandfire.com/api/${localStorageKey}/${id}`

        try {
            const data = await new Fetcher({ url }).fetch() as DetailFetcherData
            const transformedData = Transformer.addIdToObject(id, data)

            this.renderWithData(transformedData)

            localStorageService.merge(localStorageKey, transformedData)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
