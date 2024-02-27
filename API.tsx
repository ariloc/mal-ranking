const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://api.myanimelist.net/v2',
    headers: {'X-MAL-CLIENT-ID': ''},
});

type PagingDto = {
    next: string,
    previous: string
}

type RankingInfoDto = {
    rank: number,
    previous_rank: number | null
}

type PictureURL = {
    large: string | null,
    medium: string
}

export type AnimeDetailsDto = {
    id: number,
    title: string,
    main_picture: PictureURL | null
    synopsis: string | null,
    rank: number | null
}

type AnimeRankingItemDto = {
    node: AnimeDetailsDto[],
    ranking: RankingInfoDto[],
}

type AnimeRankingDto = {
    data: AnimeRankingItemDto[],
    paging: PagingDto[]
}

export async function getAnimeRanking(pageParam: number) {
    const response = await instance.get('/anime/ranking', {
        params: {
            ranking_type: 'all',
            offset: pageParam,
            limit: 10,
        }
    });
    return response.data as AnimeRankingDto;
}
