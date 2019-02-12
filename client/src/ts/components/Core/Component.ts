export class Component {
    public render: () => Promise<HTMLElement> | Promise<null> | HTMLElement | null
}
