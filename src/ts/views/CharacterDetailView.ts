import { translatedKeys, Character } from '../types/Character'
import { fetchByUrl } from '../fetchers/generic'

export async function CharacterDetailView(hook: HTMLElement, id: number) {
    const character = await fetchByUrl<Character>(`https://anapioficeandfire.com/api/characters/${id}`)
    const titleElement = document.createElement('h2')
    const listElement = document.createElement('ul')
    listElement.classList.add('data-list')

    Object.entries(character).map(async ([ key, value ]) => {
        if (shouldHideProperty(key, value)) {
            return
        }

        const wrapperElement = document.createElement('li')
        const keyElement = document.createElement('h3')
        const valueElement = document.createElement('p')

        keyElement.innerText = translatedKeys[key]

        const dataContent = await getDataContent(value)
        valueElement.innerText = dataContent

        wrapperElement.appendChild(keyElement)
        wrapperElement.appendChild(valueElement)
        listElement.appendChild(wrapperElement)
    })

    titleElement.innerText = character.name

    hook.appendChild(titleElement)
    hook.appendChild(listElement)
}

function shouldHideProperty(key: string, value: string) {
    return !value
        || value.length === 0
        || (Array.isArray(value) && !value[0])
        || key === 'url' || key === 'name'
}

async function getDataContent(value: string | string[]) {
    if (Array.isArray(value)) {
        const values = await Promise.all(value.map(async (textOrUrl, i) => {
            if (textOrUrl.includes('https://')) {
                return fetchName(textOrUrl)
            } else {
                return textOrUrl
            }
        }))

        return values.join('\n')
    } else {
        if (value.includes('https://')) {
            return fetchName(value)
        } else {
            return value
        }
    }

    async function fetchName(url: string) {
        const data = await fetchByUrl<any>(url)
        return data.name
    }
}
