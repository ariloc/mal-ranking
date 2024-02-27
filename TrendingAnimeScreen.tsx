import { useState } from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query'
import AnimeItemView from './AnimeItemView';
import AnimeItem from './AnimeItem';
import { getAnimeRanking, AnimeRankingDto } from './API'

const testData: AnimeItem[] = [
    {
        title: "Lorem ipsum",
        synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        picture_url: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
        rank: 1
    },
    {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida dictum fusce ut placerat. Id venenatis a condimentum vitae sapien. Nisl vel pretium lectus quam id leo. Aliquam sem et tortor consequat id porta nibh. Lorem mollis aliquam ut porttitor. Ac auctor augue mauris augue neque gravida in. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Nunc non blandit massa enim nec. In ante metus dictum at tempor commodo ullamcorper. Lacus vestibulum sed arcu non.",
        picture_url: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
        rank: 2
    },
];

function AniRankingDtoToAniItem(ranking: AnimeRankingDto) {
    const ret = ranking.data.map((item) => {
        const ret2: AnimeItem = {
            title: item.node.title,
            picture_url: item.node.main_picture.medium,
            synopsis: item.node.synopsis,
            rank: item.ranking.rank
        };
        return ret2;
    }
    );
    return ret;
}

function TrendingAnimeScreen() {
    const {
        data,
        error,
        fetchNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['trending-anime'],
        queryFn: getAnimeRanking,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const url = new URL(lastPage.paging.next);
            console.log(parseInt(url.searchParams.get("offset")));
            return parseInt(url.searchParams.get("offset"));
        }
    });

    const ListEndLoader = () => {
        return (
            <ActivityIndicator />
        );
    }

    return status === 'pending' ? (
        <ActivityIndicator style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} />
    ) : status === 'error' ? (
        <Text>{error.message}</Text>
    ) : (
        <FlatList
            data = {data.pages.map((group,i) => AniRankingDtoToAniItem(group)).flat()}
            renderItem={({item}) => <AnimeItemView item={item} />}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
            ListFooterComponent={ListEndLoader}
        />
    );
}

export default TrendingAnimeScreen;
