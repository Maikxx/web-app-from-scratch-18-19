interface Props {
    title: string
    hook: HTMLElement
}

export class PageHeader {
    constructor(private props: Props) {}

    public render() {
        const { title, hook } = this.props
        const headerElement = document.createElement('header')
        const headingElement = document.createElement('h1')

        headingElement.innerText = title
        headerElement.appendChild(headingElement)

        hook.appendChild(headerElement)
    }
}
