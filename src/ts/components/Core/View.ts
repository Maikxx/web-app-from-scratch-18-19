export class View {
    constructor(private hook?: HTMLElement) {}

    public render() {
        const view = document.createElement('section')
        view.classList.add('view')

        return this.hook
            ? this.hook.appendChild(view)
            : view
    }
}
