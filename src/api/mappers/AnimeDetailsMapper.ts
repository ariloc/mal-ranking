import AnimeDetails from "../../data/AnimeDetails";
import { AnimeDetailsDto } from "../dto/AnimeDetailsDto";

export class AnimeDetailsMapper {
    public static toEntity(dto: AnimeDetailsDto): AnimeDetails {
        return {
            id: dto.id,
            title: dto.title,
            synopsis: dto.synopsis,
            picture_url: dto.main_picture?.large ?? null,
            rank: dto.rank
        };
    }
}