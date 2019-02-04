import { translatedKeys } from '../types/Character'
import { fetchCharacter } from '../fetchers/character'

export async function CharacterDetailView(hook: HTMLElement) {
    const { url } = window.history.state

    let character
    try {
        character = await fetchCharacter(url)
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }

    const titleElement = document.createElement('h2')
    const listElement = document.createElement('ul')
    listElement.classList.add('data-list')

    Object.entries(character).map(([ key, value ]) => {
        if (!value || value.length === 0 || (Array.isArray(value) && !value[0]) || key === 'url' || key === 'name') {
            return
        }

        const wrapperElement = document.createElement('li')
        const keyElement = document.createElement('h3')
        const valueElement = document.createElement('p')

        keyElement.innerText = translatedKeys[key]

        if (Array.isArray(value)) {
            value.forEach((v, i) => {
                if (v.includes('https://')) {
                    createAchors(v, valueElement)
                } else {
                    if (i === 0) {
                        valueElement.innerText = v
                    } else {
                        valueElement.innerText += `\n${v}`
                    }
                }
            })
        } else {
            if (value.includes('https://')) {
                createAchors(value, valueElement)
            } else {
                valueElement.innerText = value
            }
        }

        wrapperElement.appendChild(keyElement)
        wrapperElement.appendChild(valueElement)
        listElement.appendChild(wrapperElement)
    })

    titleElement.innerText = character.name

    hook.appendChild(titleElement)
    hook.appendChild(listElement)
}

function createAchors(url: string, hook: HTMLElement) {
    const anchorElement = document.createElement('a') as HTMLAnchorElement
    anchorElement.setAttribute('href', url)
    anchorElement.innerText = url
    hook.appendChild(anchorElement)
}
