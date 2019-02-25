import { Loader } from '../components/Core/Feedback/Loader'
import { Component } from './Component'

export class M {
    public static async render(component: HTMLElement | string | Component<any> | Element, host: HTMLElement | Element) {
        let _node
        if (typeof component === 'string') {
            _node = document.createTextNode(component)
        } else if (component instanceof Component) {
            const content = await component.render()
            _node = content
        } else {
            _node = component
        }

        if (!_node) {
            return null
        }

        host.appendChild(_node)

        return host
    }

    public static create(component: string | Function, properties: Object, ...children: any[]) {
        const _node: HTMLElement = typeof component === 'function'
            ? component(properties, children)
            : document.createElement(component)

        if (properties) {
            // TODO: Look into ways in which we check for valid attributes for a given node before assigning.
            Object.entries(properties).forEach(M.parseAttribute(_node))
        }

        if (children && children.length > 0) {
            children.forEach(child => Array.isArray(child)
                ? child.forEach(c => this.render(c, _node))
                : this.render(child, _node)
            )
        }

        return _node
    }

    public static parseAttribute(_node: HTMLElement) {
        return function ([ attribute, value ]: [string, any]) {
            if (attribute.includes('event:')) {
                const [ , event ] = attribute.split(':')
                _node.addEventListener(event, value)
            } else if (attribute.includes('classList')) {
                const [ , action ] = attribute.split(':')

                if (value.includes(' ')) {
                    const classNames = value.split(' ')
                    classNames.forEach((className: string) => {
                        _node.classList[action](className)
                    })
                } else {
                    _node.classList[action](value)
                }
            } else {
                _node.setAttribute(attribute, value)
            }
        }
    }

    public static resetComponent(component: HTMLElement) {
        component.innerHTML = ''
    }

    public static toggleLoader(host: HTMLElement) {
        const loaderElement = host.querySelector('.Loader')
        if (!loaderElement) {
            M.render(new Loader({}), host)
        } else {
            host.removeChild(loaderElement)
        }
    }
}
