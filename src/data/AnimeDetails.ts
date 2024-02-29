export default interface AnimeDetails {
    id: number
    title: string
    synopsis: string | null
    picture_url: string | null
    rank: number | null
};

export const ANIME_DETAILS_DEFAULT: AnimeDetails = {
    id: 0,
    title: "",
    synopsis: null,
    picture_url: null,
    rank: null
}