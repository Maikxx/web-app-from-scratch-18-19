import Navigo from 'navigo'

interface Props {
    title: string
    hook: HTMLElement
    router: Navigo
}

export class PageHeader {
    constructor(private props: Props) {
        this.render()
    }

    public render() {
        const { title, hook, router } = this.props
        const headerElement = document.createElement('header')
        headerElement.classList.add('PageHeader')
        const backElement = document.createElement('a')
        backElement.addEventListener('click', () => {
            router.navigate('/')
        })
        backElement.innerText = 'Game of Thrones'
        const headingElement = document.createElement('h1')

        headingElement.innerText = title
        headerElement.appendChild(backElement)
        headerElement.appendChild(headingElement)

        hook.appendChild(headerElement)
    }
}
