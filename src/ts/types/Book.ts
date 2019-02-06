export const translatedKeys = {
    isbn: 'ISBN',
    authors: 'Authors',
    numberOfPages: 'Number of pages',
    publisher: 'Publisher',
    country: 'Country',
    mediaType: 'Media type',
    released: 'Released',
    characters: 'Characters',
}

export interface Book {
    isbn: string
    authors: string
    numberOfPages: number
    publisher: string
    country: string
    mediaType: string
    released: string
    characters: string[]
    name: string
    url: string
}
