export class M {
    public static render(component: HTMLElement | string, host: HTMLElement) {
        const _node = typeof component === 'string'
            ? document.createTextNode(component)
            : component

        host.appendChild(_node)
    }

    public static createElement(component: string | Function, properties: Object, ...children: any[]) {
        const _node: HTMLElement = typeof component === 'function'
            ? component(properties, children)
            : document.createElement(component)

        if (properties) {
            // Properties are set on the attribute, this might not always be what the user wants.
            // TODO: Look into ways in which we check for valid attributes for a given node before assigning.
            Object.entries(properties).forEach(([ attribute, value ]) => {
                _node.setAttribute(attribute, value)
            })
        }

        if (children && children.length > 0) {
            children.forEach(child => this.render(child, _node))
        }

        return _node
    }
}
