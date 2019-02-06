import { translatedKeys, Character } from '../types/Character'
import { fetchByUrl } from '../fetchers/generic'
import { PageHeader } from '../components/Chrome/PageHeader'

interface Props {
    hook: HTMLElement
    id: number
}

interface FetchData {
    [key: string]: any
    name: string
    url: string
}

export class CharacterDetailView {
    constructor(private props: Props) {
        const { id } = this.props

        ; (async () => {
            const url = `https://anapioficeandfire.com/api/characters/${id}`
            try {
                const character = await fetchByUrl<Character>(url)
                this.render(character)
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        })()
    }

    public render(character: Character) {
        const { hook } = this.props

        new PageHeader({ hook, title: character.name })

        const listElement = document.createElement('ul')
        listElement.classList.add('data-list')

        Object.entries(character).map(async ([ key, value ]) => {
            if (this.shouldHideProperty(key, value)) {
                return
            }

            const wrapperElement = document.createElement('li')
            const keyElement = document.createElement('h3')
            const valueElement = document.createElement('p')

            keyElement.innerText = translatedKeys[key]

            const dataContent = await this.getDataContent(value)
            valueElement.innerText = dataContent

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

    private async getDataContent(value: string | string[]) {
        if (Array.isArray(value)) {
            const values = await Promise.all(value.map(getContentValue))

            return values.join('\n')
        } else {
            return getContentValue(value)
        }

        async function getContentValue(textOrUrl: string) {
            if (textOrUrl.includes('https://')) {
                return fetchName(textOrUrl)
            } else {
                return textOrUrl
            }
        }

        async function fetchName(url: string) {
            const data = await fetchByUrl<FetchData>(url)
            console.log(data)
            return data.name
        }
    }
}
