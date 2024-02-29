import axios, {AxiosInstance} from 'axios';
import AnimeRankingDto from "./dto/AnimeRankingDto";
import { AnimeDetailsDto } from "./dto/AnimeDetailsDto";
import { Config } from 'react-native-config';
import { TRENDING_PAGE_REQUEST_SIZE } from '../Constants';

const MAL_API_URL = 'https://api.myanimelist.net/v2'

export interface IMalService {
    fetchAnimeRanking: (pageOffset: number) => Promise<AnimeRankingDto>;
    fetchAnimeDetails: (id: number, fields: string[]) => Promise<AnimeDetailsDto>;
};

export class MalService implements IMalService {
    _axiosInstance: AxiosInstance

    constructor() {
        this._axiosInstance = axios.create({
            baseURL: MAL_API_URL,
            headers: {'X-MAL-CLIENT-ID': Config.MAL_API_KEY},
        });
    }

    public async fetchAnimeRanking(pageOffset: number): Promise<AnimeRankingDto> {
        const response = await this._axiosInstance.get('/anime/ranking', {
            params: {
                ranking_type: 'all',
                offset: pageOffset,
                limit: TRENDING_PAGE_REQUEST_SIZE,
            }
        });
        return response.data;
    }

    public async fetchAnimeDetails(id: number, fields: string[]): Promise<AnimeDetailsDto> {
        const response = await this._axiosInstance.get('/anime/' + id, {
            params: {fields: fields.join(',')}
        });
        return response.data;
    }
}