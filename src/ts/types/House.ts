export const translatedKeys = {
    url: 'Url',
    name: 'Name',
    region: 'Region',
    coatOfArms: 'Coat of Arms',
    words: 'Words',
    titles: 'Titles',
    seats: 'Seats',
    currentLord: 'Current lord',
    heir: 'Heir',
    overlord: 'Overlord',
    founded: 'Founded',
    founder: 'Founder',
    diedOut: 'Died out',
    ancestralWeapons: 'Ancestral weapons',
    cadetBranches: 'Cadet branches',
    swornMembers: 'Sworn members',
}

export interface House {
    url: string
    name: string
    region: string
    coatOfArms: string
    words: string
    titles: string
    seats: string
    currentLord: string
    heir: string
    overlord: string
    founded: string
    founder: string
    diedOut: string
    ancestralWeapons: string[]
    cadetBranches: string[]
    swornMembers: string[]
}
