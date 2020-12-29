export type ID = string
export type IMG = string

export interface ICard {
    id: ID
    h3: string
    h6top: string
    h6bot: string
    img: IMG
    year?: string
}

export interface IFilm {
    id: ID
    title: string
    year: string
    producer: ICard
    coverIMG: IMG
    collage: IMG
    tags: string
    briefAbout: string
    about: {
        img: IMG
        paragraphs: string[]
    }
    acters: ICard
}

export interface IPerson {
    id: ID
    name: string
    title: string
    briefAbout: string
    about: {
        mostPopularFilm: ICard
        paragraphs: string[]
    }
    imgs: IMG[]
    filmography: ICard[]
}