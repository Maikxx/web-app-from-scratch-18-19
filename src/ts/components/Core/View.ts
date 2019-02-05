export class View {
    constructor(private hook?: HTMLElement) {
        this.render()
    }

    public render() {
        const view = document.createElement('section')
        view.classList.add('view')

        return this.hook
            ? this.hook.appendChild(view)
            : view
    }
}
