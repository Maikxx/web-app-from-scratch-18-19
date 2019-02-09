export function sortByObjectKey<TData>(key: string) {
    return function (a: TData, b: TData) {
        return a[key] > b[key]
            ? 1
            : -1
    }
}
