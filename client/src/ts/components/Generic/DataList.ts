import { translatedTypes } from '../../translations/translatedTypes'
import { DetailFetcherData } from '../../types/Fetchers'
import { validateDate } from '../../utils/validateDate'
import { Fetcher } from '../Core/Fetcher'
import Navigo from 'navigo'

interface Props {
    data: DetailFetcherData
    hook: HTMLElement
    router: Navigo
    shouldHidePropertyCheck?: (key: string, value: string | string[] | number) => boolean
}

export class DataList {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { data, hook } = this.props

        const listElement = document.createElement('ul')
        listElement.classList.add('data-list')

        Object.entries(data).map(async ([ key, value ]) => {
            if (this.shouldHideProperty(key, value)) {
                return
            }

            const wrapperElement = document.createElement('li')
            const keyElement = document.createElement('h3')
            const valueElement = document.createElement('p')

            keyElement.innerText = translatedTypes[key]

            await this.renderDataContent(valueElement, value)

            wrapperElement.appendChild(keyElement)
            wrapperElement.appendChild(valueElement)
            listElement.appendChild(wrapperElement)
        })

        hook.appendChild(listElement)
    }

    private shouldHideProperty(key: string, value: string | string[] | number) {
        const { shouldHidePropertyCheck } = this.props

        if (shouldHidePropertyCheck) {
            return shouldHidePropertyCheck(key, value)
        }

        return !value
            || (typeof value !== 'number' && value.length === 0)
            || (Array.isArray(value) && !value[0])
            || key === 'url' || key === 'name'
    }

    private async renderDataContent(hook: HTMLElement, value: string | string[] | number) {
        const { router } = this.props

        if (Array.isArray(value)) {
            value.forEach(getContentValue(hook))
        } else {
            getContentValue(hook)(value)
        }

        function getContentValue(hook: HTMLElement) {
            return async function(value: string | number) {
                try {
                    if (typeof value !== 'number' && value.includes('https://')) {
                        const data = await new Fetcher({ url: value }).fetch() as DetailFetcherData

                        const buttonElement = document.createElement('button')
                        buttonElement.addEventListener('click', () => {
                            const [ id, path ] = data.url.split('/').reverse()
                            router.navigate(`/${path}/${id}`)
                        })

                        buttonElement.classList.add('link')
                        buttonElement.innerText = data.name

                        hook.appendChild(buttonElement)
                    } else {
                        hook.innerText = typeof value !== 'number'
                            ? validateDate(value)
                                ? new Date(value).toLocaleDateString()
                                : value
                            : String(value)
                    }
                } catch (error) {
                    console.error(error)
                    throw new Error(error)
                }
            }
        }
    }
}
