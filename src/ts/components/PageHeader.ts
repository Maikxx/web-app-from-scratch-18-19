export function createPageHeader(title: string, elementToAppendTo: HTMLElement) {
    const headerElement = document.createElement('header')
    const headingElement = document.createElement('h1')

    headingElement.innerText = title
    headerElement.appendChild(headingElement)
    elementToAppendTo.appendChild(headerElement)
}
