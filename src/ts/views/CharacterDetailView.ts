import { Character, translatedKeys } from '../types/Character'

export async function CharacterDetailView(hook: HTMLElement) {
    const { url } = window.history.state
    const data = await fetch(url)
    const character = await data.json() as Character

    const titleElement = document.createElement('h2')
    const sectionElement = document.createElement('section')

    Object.entries(character).map(([ key, value ]) => {
        if (!value || value.length === 0 || (Array.isArray(value) && !value[0])) {
            return
        }

        const keyElement = document.createElement('h3')
        const valueElement = document.createElement('span')

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

        sectionElement.appendChild(keyElement)
        sectionElement.appendChild(valueElement)
    })

    titleElement.innerText = character.name

    hook.appendChild(titleElement)
    hook.appendChild(sectionElement)
}

function createAchors(url: string, hook: HTMLElement) {
    const anchorElement = document.createElement('a') as HTMLAnchorElement
    anchorElement.setAttribute('href', url)
    anchorElement.innerText = url
    hook.appendChild(anchorElement)
}
