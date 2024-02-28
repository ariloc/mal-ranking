type PictureURL = {
    large: string | null,
    medium: string
};

export type AnimeDetailsShortDto = {
    id: number,
    title: string,
    main_picture: PictureURL | null
    rank: number | null
};

export type AnimeDetailsDto = {
    id: number,
    title: string,
    main_picture: PictureURL | null
    synopsis: string | null,
    rank: number | null
};
