import { Router } from '../Core/Router'
import { fetchByUrl } from '../../fetchers/generic'
import { translatedTypes } from '../../translations/translatedTypes'
import { Book } from '../../types/Book'
import { Character } from '../../types/Character'
import { House } from '../../types/House'

interface Props {
    data: Book | Character | House
    hook: HTMLElement
    router: Router
    shouldHidePropertyCheck?: (key: string, value: string | string[]) => boolean
}

interface FetchData {
    [key: string]: string | string[] | number
    name: string
    url: string
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

    private shouldHideProperty(key: string, value: string | string[]) {
        const { shouldHidePropertyCheck } = this.props

        if (shouldHidePropertyCheck) {
            return shouldHidePropertyCheck(key, value)
        }

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
                    const data = await fetchByUrl<FetchData>(textOrUrl)

                    const buttonElement = document.createElement('button')
                    buttonElement.addEventListener('click', () => {
                        const [ id, path ] = data.url.split('/').reverse()
                        router.redirect(`/${path}/${id}`)
                    })

                    buttonElement.classList.add('link')
                    buttonElement.innerText = data.name

                    hook.appendChild(buttonElement)
                } else {
                    hook.innerText = textOrUrl
                }
            }
        }
    }
}
