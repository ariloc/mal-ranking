import { Text, FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query'
import AnimeItemView from '../AnimeItemView';
import AnimeDetailsShort from './data/AnimeDetailsShort';
import { MalRepository, IMalRepository } from './api/MalRepository';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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

function TrendingAnimeScreen() {
    const malRepo: IMalRepository = new MalRepository()

    const {
        data,
        error,
        fetchNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['trending-anime'],
        queryFn: ({ pageParam }) => malRepo.getAnimeRanking(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _) => lastPage.nextPage
    });

    const ListEndLoader = () => {
        return (
            <ActivityIndicator style={{padding: 8}} />
        );
    }

    return status === 'pending' ? (
        <ActivityIndicator size={'large'} style={styles.main_loading_indicator} />
    ) : status === 'error' ? (
        <View style={styles.error_indicator}>
            <FontAwesome6 size={64} name={'circle-exclamation'} />
            <Text>
                {error.message}
            </Text>
        </View>
    ) : (
        <FlatList
            data = {data.pages.map((page,i) => page.data).flat()}
            renderItem={({item}) => <AnimeItemView item={item} />}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
            ListFooterComponent={ListEndLoader}
        />
    );
}

const styles = StyleSheet.create({
    main_loading_indicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    error_indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TrendingAnimeScreen;
