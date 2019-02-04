export const translatedKeys = {
    url: 'Url',
    name: 'Name',
    gender: 'Gender',
    culture: 'Culture',
    born: 'Born',
    died: 'Died',
    titles: 'Titles',
    aliases: 'Aliases',
    father:	'Father',
    mother:	'Mother',
    spouse:	'Spouse',
    allegiances: 'Allegiances',
    books: 'Books',
    povBooks: 'Pov books',
    tvSeries: 'Tv series',
    playedBy: 'Played by',
}

export interface Character {
    url: string
    name: string
    gender: string
    culture: string
    born: string
    died: string
    titles?: string[]
    aliases?: string[]
    father:	string
    mother:	string
    spouse:	string
    allegiances?: string[]
    books?: string[]
    povBooks?: string[]
    tvSeries?: string[]
    playedBy?: string[]
}
