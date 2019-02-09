export function validateDate(text: string) {
    const dateToTest = new Date(text)
    return Boolean(+dateToTest)
}
