export function validateDate(text: string) {
    const dateToTest = new Date(text)
    return Boolean(+dateToTest)
}

export function isObject(subject: any) {
    return subject === Object(subject)
}
