import AnimeRankingDto from './types/AnimeRankingDto'
import { AnimeRanking } from '../data/AnimeRanking';
import PagedResult from '../utils/PagedResult';
import Utils from '../utils/Utils'

export class AnimeRankingMapper {
    static toEntity(dto: AnimeRankingDto): PagedResult<AnimeRanking> {
        const details: AnimeRanking = dto.data.map((item) => {
            return {
                id: item.node.id,
                title: item.node.title,
                picture_url: item.node.main_picture?.medium ?? null,
                rank: item.ranking.rank
            };
        });

        const nextParams = Utils.getURLSearchParamOrNull(dto.paging.next, 'offset');
        const previousParams = Utils.getURLSearchParamOrNull(dto.paging.previous, 'offset');

        const pageSizeStr = 
            Utils.getURLSearchParamOrNull(dto.paging.next, 'limit')
            || Utils.getURLSearchParamOrNull(dto.paging.previous, 'limit') ;

        return {
            data: details,
            nextPage: nextParams != null ? parseInt(nextParams) : null,
            previousPage: previousParams != null ? parseInt(previousParams) : null,
            pageSize: pageSizeStr != null ? parseInt(pageSizeStr) : null,
        }
    }
}
