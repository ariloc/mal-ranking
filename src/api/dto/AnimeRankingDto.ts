import { PagingDto } from "./PagingDto"
import { AnimeDetailsShortDto } from "./AnimeDetailsDto"

type RankingInfoDto = {
    rank: number,
    previous_rank: number | null
}

type AnimeRankingItemDto = {
    node: AnimeDetailsShortDto,
    ranking: RankingInfoDto,
}

type AnimeRankingDto = {
    data: AnimeRankingItemDto[],
    paging: PagingDto
}

export default AnimeRankingDto;
