import { fetchByUrl } from '../fetchers/generic'
import { PageHeader } from '../components/Chrome/PageHeader'
import { Router } from '../components/Core/Router'
import { House } from '../types/House'
import { DataList } from '../components/Generic/DataList'

interface Props {
    hook: HTMLElement
    id: number
    router: Router
}

export class HouseDetailView {
    constructor(private props: Props) {
        const { id } = this.props

        ; (async () => {
            const url = `https://anapioficeandfire.com/api/houses/${id}`
            try {
                const house = await fetchByUrl<House>(url)
                this.render(house)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()
    }

    public render(house: House) {
        const { hook, router } = this.props

        new PageHeader({ hook, title: house.name })
        new DataList({ hook, router, data: house })
    }
}
