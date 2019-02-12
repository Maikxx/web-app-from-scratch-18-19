export class View {
    constructor(private host?: HTMLElement) {
        this.render()
    }

    public render() {
        const view = document.createElement('section')
        view.classList.add('view')

        return this.host
            ? this.host.appendChild(view)
            : view
    }
}
