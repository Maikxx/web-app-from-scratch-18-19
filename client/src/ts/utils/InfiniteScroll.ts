import { Validator } from './Validator'

interface InfiniteScrollProps {
    root: string | HTMLElement | null | Element
    onLoadMore: () => Promise<void>
    pageSize: number
}

export class InfiniteScroll {
    private root: HTMLElement | null
    private observer = new IntersectionObserver(this.scrollListener.bind(this), { threshold: 1 })
    private observedElement: HTMLElement | Element | null

    constructor(private props: InfiniteScrollProps) {
        const { root } = this.props

        if (Validator.isTypeOf(root, 'string')) {
            this.root = document.querySelector(root as string) as HTMLElement
        } else {
            this.root = root as HTMLElement
        }

        this.setObservable(this.root.children[this.root.children.length - 1])
    }

    public setObservable = (observedElement: HTMLElement | Element) => {
        this.observedElement = observedElement
        this.observer.observe(this.observedElement)
    }

    public unsetObservable = () => {
        if (!this.observedElement) {
            return
        }

        this.observer.unobserve(this.observedElement)
        this.observedElement = null
    }

    public scrollListener(changes: IntersectionObserverEntry[]) {
        changes.forEach(async change => {
            if (change.intersectionRatio > 0) {
                const { onLoadMore } = this.props
                this.unsetObservable()

                await onLoadMore()
                this.updateObservable()
            }
        })
    }

    public updateObservable = () => {
        const { pageSize } = this.props

        if (!this.root) {
            return
        }

        this.setObservable(this.root.children[this.root.children.length - (pageSize / 2)])
    }
}
