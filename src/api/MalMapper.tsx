import AnimeRankingDto from './types/AnimeRankingDto'
import { AnimeRanking } from '../data/AnimeRanking';

export class AnimeRankingMapper {
    static toEntity(dto: AnimeRankingDto): AnimeRanking {
        return dto.data.map((item) => {
            return {
                id: item.node.id,
                title: item.node.title,
                picture_url: item.node.main_picture?.medium ?? null,
                rank: item.ranking.rank
            };
        })
    }
}
