import { translatedTypes } from '../../translations/translatedTypes'
import { DetailFetcherData } from '../../types/Fetchers'
import { Fetcher } from '../Core/Fetcher'
import Navigo from 'navigo'
import { validateDate } from '../../utils/validators'
import { M, Component } from '../Core/Engine'

interface Props {
    data: DetailFetcherData
    router: Navigo
    shouldHidePropertyCheck?: (key: string, value: string | string[] | number) => boolean
}

export class DataList extends Component {
    constructor(private props: Props) {
        super()
    }

    public render = async () => {
        const { data } = this.props
        const listElements = await Promise.all(Object.entries(data).map(this.createListElement))

        return M.create('ul', { 'classList:add': 'data-list' }, ...listElements)
    }

    private createListElement = async ([ key, value ]: [string, string | string[] | number]) => {
        if (this.shouldHideProperty(key, value)) {
            return null
        }

        const content = await this.getDataContent(value)

        return M.create('li', {}, ...[
            M.create('h3', {}, translatedTypes[key]),
            M.create('p', {}, content),
        ])
    }

    private shouldHideProperty = (key: string, value: string | string[] | number) => {
        const { shouldHidePropertyCheck } = this.props

        if (shouldHidePropertyCheck) {
            return shouldHidePropertyCheck(key, value)
        }

        return !value
            || (typeof value !== 'number' && value.length === 0)
            || (Array.isArray(value) && !value[0])
            || key === 'url' || key === 'name'
    }

    private getDataContent = async (value: string | string[] | number) => {
        if (Array.isArray(value)) {
            return Promise.all(value.map(this.getContentValue))
        } else {
            return this.getContentValue(value)
        }
    }

    private getContentValue = async (value: string | number) => {
        try {
            if (typeof value !== 'number' && value.includes('https://')) {
                const data = await new Fetcher({ url: value }).fetch() as DetailFetcherData

                return M.create(
                    'button',
                    {
                        'event:click': this.handleLinkClick(data),
                        'classList:add': 'link',
                    },
                    data.name
                )
            } else {
                if (typeof value !== 'number') {
                    if (validateDate(value)) {
                        return new Date(value).toLocaleDateString()
                    } else {
                        return value
                    }
                } else {
                    return String(value)
                }
            }
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    private handleLinkClick = (data: DetailFetcherData) => {
        const { router } = this.props

        return function() {
            const [ id, path ] = data.url.split('/').reverse()
            router.navigate(`/${path}/${id}`)
        }
    }
}
