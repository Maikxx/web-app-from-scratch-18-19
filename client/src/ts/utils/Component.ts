export interface DefaultProps<TProps> {
    className?: string
    children: Children<TProps>
}

export type Children<TProps> = (string | HTMLElement | Component<TProps>)[]

export class Component<TProps> {
    public render: () => Promise<HTMLElement> | Promise<null> | HTMLElement | null

    // tslint:disable-next-line:no-empty
    constructor(props: TProps) {}
}
