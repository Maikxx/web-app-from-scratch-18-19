import { ALLOWED_TAGS_PER_ATTRIBUTE } from '../translations/attributeTagPairs'

export class Validator {
    public static validateDate(text: string) {
        const dateToTest = new Date(text)
        return Boolean(+dateToTest)
    }

    public static isObject(subject: any) {
        return !Array.isArray(subject) && subject === Object(subject)
    }

    public static isTypeOf(value: any, type: string) {
        return typeof value === type
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

    public static isTruthyArray(value: any) {
        return Array.isArray(value) && value.length > 0
    }
}
