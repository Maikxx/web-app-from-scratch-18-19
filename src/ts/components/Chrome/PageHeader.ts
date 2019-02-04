interface Props {
    title: string
}

export class PageHeader {
    constructor(private hook: HTMLElement, private props: Props) {}

    public render() {
        const { title } = this.props
        const headerElement = document.createElement('header')
        const headingElement = document.createElement('h1')

        headingElement.innerText = title
        headerElement.appendChild(headingElement)

        this.hook.appendChild(headerElement)
    }
}
