import { translatedTypes } from '../../translations/translatedTypes'
import { DetailFetcherData } from '../../types/Fetchers'
import { Fetcher } from '../../utils/Fetcher'
import Navigo from 'navigo'
import { Validator } from '../../utils/Validator'
import { M } from '../../utils/Engine'
import { Component } from '../../utils/Component'
import { Heading } from '../Core/DataDisplay/Text/Heading'
import { Paragraph } from '../Core/DataDisplay/Text/Paragraph'
import { Transformer } from '../../utils/Transformer'
import { Button } from '../Core/DataDisplay/Button'
import { ListItem } from '../Core/DataDisplay/ListItem'
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
            children: listElements.filter(el => !!el) as Component<any>[],
            className: 'DataList',
        }).render()
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

    private shouldHideProperty = (key: string, value: string | string[] | number) => {
        return !value
            || (typeof value !== 'number' && value.length === 0)
            || (Array.isArray(value) && !value[0])
            || key === 'url' || key === 'name' || key === 'id'
    }

    private getDataContent = async (value: string | string[] | number) => {
        if (Array.isArray(value)) {
            return Promise.all(value.map(this.getContentValue))
        } else {
            return this.getContentValue(value)
        }
    }

    private getContentValue = async (value: string | number) => {
        try {
            if (typeof value !== 'number' && value.includes('https://')) {
                const data = await new Fetcher({ url: value }).fetch() as DetailFetcherData

                return new Button({
                    onClick: this.handleLinkClick(data),
                    className: 'Link',
                    children: [data.name],
                })
            } else {
                if (typeof value !== 'number') {
                    if (Validator.validateDate(value)) {
                        return this.renderItemContentText(new Date(value).toLocaleDateString())
                    } else {
                        return this.renderItemContentText(value)
                    }
                } else {
                    return this.renderItemContentText(String(value))
                }
            }
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    private renderItemContentText = (content: string) => {
        return new Paragraph({
            className: 'DataList__item-content-text',
            children: [content],
        })
    }

    private handleLinkClick = (data: DetailFetcherData) => {
        const { router } = this.props

        return function() {
            const [ id, path ] = data.url.split('/').reverse()
            router.navigate(`/${path}/${id}`)
        }
    }
}
