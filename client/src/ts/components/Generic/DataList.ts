import { translatedTypes } from '../../translations/translatedTypes'
import { DetailFetcherData } from '../../types/Fetchers'
import Navigo from 'navigo'
import { Validator } from '../../utils/Validator'
import { M } from '../../utils/Engine'
import { Component } from '../../utils/Component'
import { Heading } from '../Core/DataDisplay/Text/Heading'
import { Paragraph } from '../Core/DataDisplay/Text/Paragraph'
import { Transformer } from '../../utils/Transformer'
import { Button } from '../Core/DataDisplay/Button'
import { ListItem, ListItemProps } from '../Core/DataDisplay/ListItem'
import { List } from '../Core/DataDisplay/List'

interface Props {
    data: DetailFetcherData
    router: Navigo
    loaderRoot: HTMLElement
}

export class DataList extends Component<Props> {
    constructor(private props: Props) {
        super(props)
    }

    public render = async () => {
        const { data, loaderRoot } = this.props
        const listElements = await Promise.all(Object.entries(data).map(this.createListElement))

        M.toggleLoader(loaderRoot)

        return new List({
            children: listElements.filter(el => !!el) as Component<ListItemProps>[],
            className: 'DataList',
        }).render()
    }

    private shouldHideProperty = (key: string, value: string | string[] | number) => {
        return !value
            || (typeof value !== 'number' && value.length === 0)
            || (Array.isArray(value) && !value[0])
            || (key === 'url' || key === 'name' || key === 'id')
    }

    private createListElement = async ([ key, value ]: [string, string | string[] | number]) => {
        if (this.shouldHideProperty(key, value)) {
            return
        }

        const content = await this.getDataContent(value)

        return new ListItem({
            className: 'DataList__item',
            children: [
                new Heading({
                    level: 3,
                    className: 'DataList__item-heading',
                    children: [translatedTypes[key]],
                }),
                new Paragraph({
                    className: 'DataList__item-content',
                    children: [Transformer.flattenDeep(content)],
                }),
            ],
        })
    }

    private getDataContent = async (value: string | string[] | number) => {
        if (Array.isArray(value)) {
            return value.map(this.getContentValue)
        } else {
            return this.getContentValue(value)
        }
    }

    private getContentValue = (value: string | number | any) => {
        const { router } = this.props

        if (typeof value !== 'number' && Validator.isObject(value)) {
            return new Button({
                onClick: () => {
                    const [ id, path ] = value.url.split('/').reverse()
                    router.navigate(`/${path}/${id}`)
                },
                className: 'Link',
                children: [value.name],
            })
        } else {
            let content
            if (typeof value !== 'number') {
                content = Validator.validateDate(value)
                    ? new Date(value).toLocaleDateString()
                    : value
            } else {
                content = String(value)
            }

            return new Paragraph({
                className: 'DataList__item-content-text',
                children: [content],
            })
        }
    }
}
