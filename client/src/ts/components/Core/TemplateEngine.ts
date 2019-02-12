import { Component } from './Component'

export class M {
    public static render(component: HTMLElement | string | Component, host: HTMLElement) {
        let _node
        if (typeof component === 'string') {
            _node = document.createTextNode(component)
        } else if (component instanceof Component) {
            _node = component.render()
        } else {
            _node = component
        }

        host.appendChild(_node)

        return host
    }

    public static createElement(component: string | Function, properties: Object, ...children: any[]) {
        const _node: HTMLElement = typeof component === 'function'
            ? component(properties, children)
            : document.createElement(component)

        if (properties) {
            // Properties are set on the attribute, this might not always be what the user wants.
            // TODO: Look into ways in which we check for valid attributes for a given node before assigning.
            Object.entries(properties).forEach(([ attribute, value ]) => {
                if (attribute.includes('event:')) {
                    const [ , event ] = attribute.split(':')
                    _node.addEventListener(event, value)
                } else {
                    _node.setAttribute(attribute, value)
                }
            })
        }

        if (children && children.length > 0) {
            children.forEach(child => this.render(child, _node))
        }

        return _node
    }
}
