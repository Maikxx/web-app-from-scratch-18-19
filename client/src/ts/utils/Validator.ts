export class Validator {
    public static validateDate(text: string) {
        const dateToTest = new Date(text)
        return Boolean(+dateToTest)
    }

    public static isObject(subject: any) {
        return subject === Object(subject)
    }
}
