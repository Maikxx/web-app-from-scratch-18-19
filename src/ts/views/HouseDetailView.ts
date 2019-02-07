import { fetchByUrl } from '../fetchers/generic'
import { PageHeader } from '../components/Chrome/PageHeader'
import { Router } from '../components/Core/Router'
import { House, translatedKeys } from '../types/House'

interface Props {
    hook: HTMLElement
    id: number
    router: Router
}

interface FetchData {
    [key: string]: string | string[] | number
    name: string
    url: string
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
        const { hook } = this.props

        new PageHeader({ hook, title: house.name })

        const listElement = document.createElement('ul')
        listElement.classList.add('data-list')

        Object.entries(house).map(async ([ key, value ]) => {
            if (this.shouldHideProperty(key, value)) {
                return
            }

            const wrapperElement = document.createElement('li')
            const keyElement = document.createElement('h3')
            const valueElement = document.createElement('p')

            keyElement.innerText = translatedKeys[key]

            await this.renderDataContent(valueElement, value)

            wrapperElement.appendChild(keyElement)
            wrapperElement.appendChild(valueElement)
            listElement.appendChild(wrapperElement)
        })

        hook.appendChild(listElement)
    }

    private shouldHideProperty(key: string, value: string) {
        return !value
            || value.length === 0
            || (Array.isArray(value) && !value[0])
            || key === 'url' || key === 'name'
    }

    private async renderDataContent(hook: HTMLElement, value: string | string[]) {
        const { router } = this.props

        if (Array.isArray(value)) {
            value.forEach(getContentValue(hook))
        } else {
            getContentValue(hook)(value)
        }

        function getContentValue(hook: HTMLElement) {
            return async function(textOrUrl: string) {
                if (textOrUrl.includes('https://')) {
                    const data = await fetchNestedData(textOrUrl)

                    const buttonElement = document.createElement('button')
                    buttonElement.addEventListener('click', () => {
                        const [ id, path ] = data.url.split('/').reverse()
                        router.redirect(`/${path}/${id}`)
                    })

                    buttonElement.classList.add('link')
                    buttonElement.innerText = data.name

                    hook.appendChild(buttonElement)
                } else {
                    const spanElement = document.createElement('span')
                    spanElement.classList.add('data-list__text')
                    spanElement.innerText = textOrUrl
                    hook.appendChild(spanElement)
                }
            }
        }

        async function fetchNestedData(url: string) {
            const data = await fetchByUrl<FetchData>(url)
            return data
        }
    }
}
