import { Loader } from '../components/Core/Feedback/Loader'
import { Component } from './Component'
import { Validator } from './Validator'
import { ALLOWED_TAGS_PER_ATTRIBUTE } from '../translations/attributeTagPairs'

export class M {
    public static async render(component: HTMLElement | string | Component<any> | Element, host: HTMLElement | Element) {
        let _node
        if (Validator.isTypeOf(component, 'string')) {
            _node = document.createTextNode(component as string)
        } else if (component instanceof Component) {
            const content = await component.render()
            _node = content
        } else {
            _node = component
        }

        if (!_node) {
            return null
        }

        host.appendChild(_node as Element)

        return host
    }

    public static create(component: string | Function, properties: Object, ...children: any[]) {
        const _node: HTMLElement = Validator.isTypeOf(component, 'function')
            ? (component as any)(properties, children)
            : document.createElement(component as string)

        if (properties) {
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
        return function ([ attribute, attributeValue ]: [string, any]) {
            if (attribute.includes('event:')) {
                const [ , event ] = attribute.split(':')
                _node.addEventListener(event, attributeValue)
            } else if (attribute.includes('className')) {
                _node.setAttribute('class', attributeValue)
            } else {
                M.validateAttribute(attribute, _node.tagName)
                _node.setAttribute(attribute, attributeValue)
            }
        }
    }

    public static resetComponent(component: HTMLElement | Element) {
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

    public static getClassName(baseClassNames: string, className?: string) {
        return (className && className.length > 0)
            ? `${baseClassNames} ${className}`
            : baseClassNames
    }

    public static validateAttribute(attribute: any, tagName: string) {
        const currentAttribute = ALLOWED_TAGS_PER_ATTRIBUTE.find(({ attr }) => {
            return attr === attribute
        })

        if (!currentAttribute) {
            throw new Error(`
                You have either passed an invalid property called: ${attribute},${` `}
                or you have forgotten to handle this custom property.
            `)
        } else if (Array.isArray(currentAttribute.tags) && !currentAttribute.tags.includes(tagName.toLowerCase())) {
            throw new Error(`
                You have passed an invalid property called: ${attribute} to ${tagName}.
            `)
        }
    }
}
