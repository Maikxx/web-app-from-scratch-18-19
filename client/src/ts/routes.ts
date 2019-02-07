export const routes = {
    index: '/',
    characters: {
        index: 'characters$',
        detail: 'characters\/(.*)',
    },
    houses: {
        detail: 'houses\/(.*)',
    },
    books: {
        detail: 'books\/(.*)',
    },
}
