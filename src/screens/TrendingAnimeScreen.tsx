import { Text, FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query'
import AnimeItemView from '../components/AnimeItemView';
import AnimeDetailsShort from '../data/AnimeDetailsShort';
import { useContext } from 'react';
import { MalRepoContext, RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadableScreen from '../components/LoadableScreen';

const testData: AnimeDetailsShort[] = [
    {
        id: 0,
        title: "Lorem ipsum",
        picture_url: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
        rank: 1
    },
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        picture_url: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
        rank: 2
    },
];

type TrendingAnimeScreenProps = NativeStackScreenProps<RootStackParamList, 'TrendingAnime'>;

function TrendingAnimeScreen ({navigation, route}: TrendingAnimeScreenProps) {
    const malRepo = useContext(MalRepoContext)

    const {
        data,
        isFetched,
        isError,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['trending-anime'],
        queryFn: ({ pageParam }) => malRepo.getAnimeRanking(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _) => lastPage.nextPage,
        placeholderData: { pages: [], pageParams: [] }
    });

    const ListEndLoader = () => {
        return (
            <ActivityIndicator style={{padding: 8}} />
        );
    };

    return (
        <LoadableScreen isLoading={!isFetched} isError={isError}>
            <FlatList
                data = {data!.pages.map((page,i) => page.data).flat()}
                renderItem={({item}) => 
                    <AnimeItemView 
                        item={item} 
                        navigateToDetails={(id: number, headerTitle: string) => 
                            navigation.navigate('AnimeDetails', {id, headerTitle})
                        } 
                    />
                }
                onEndReached={() => fetchNextPage()}
                onEndReachedThreshold={0.6}
                ListFooterComponent={ListEndLoader}
            />
        </LoadableScreen>
    );
}


export default TrendingAnimeScreen;
