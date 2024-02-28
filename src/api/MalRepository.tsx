import { AnimeRanking } from "../data/AnimeRanking";
import { AnimeRankingMapper } from "./MalMapper";
import AnimeDetails from "../data/AnimeDetails";
import { MalService } from "./MalService";
import PagedList from "../utils/PagedList";

export interface IMalRepository {
    getAnimeRanking: (pageOffset: number) => Promise<PagedList<AnimeRanking>>
    getAnimeDetails: (id: number) => Promise<AnimeDetails>
}

export class MalRepository implements IMalRepository {
    _service: MalService

    constructor() {
        this._service = new MalService()
    }

    public async getAnimeRanking(pageOffset: number): Promise<PagedList<AnimeRanking>> {
        const rankingDto = await this._service.fetchAnimeRanking(pageOffset);

        const nextUrl = rankingDto.paging.next && new URL(rankingDto.paging.next);
        const previousUrl = rankingDto.paging.previous && new URL(rankingDto.paging.previous);

        const nextParams = nextUrl?.searchParams?.get('offset')
        const previousParams = previousUrl?.searchParams?.get('offset')

        const pageSizeStr = previousUrl?.searchParams?.get('limit')

        const pagedList = {
            data: AnimeRankingMapper.toEntity(rankingDto),
            nextPage: nextParams  && parseInt(nextParams),
            previousPage: previousParams && parseInt(previousParams),
            pageSize: pageSizeStr && parseInt(pageSizeStr)
        }

        return pagedList;
    }

    public async getAnimeDetails(id: number): Promise<AnimeDetails> {
        // TODO: Implement
        return {

        }
    }
}