export class Transformer {
    public static capitalize(text: string) {
        return text.length === 0
            ? ''
            : `${text[0].toUpperCase()}${text.slice(1, text.length)}`
    }
}
