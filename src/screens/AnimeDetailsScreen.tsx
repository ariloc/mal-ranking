import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MalRepoContext, RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import LoadableScreen from "../components/LoadableScreen";
import AnimeImageView from "../components/AnimeItemImageView";
import AnimeDetails, { ANIME_DETAILS_DEFAULT } from "../data/AnimeDetails";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RankIndicator from "../components/RankIndicator";

const SYNOPSIS_SHORT_LINES = 5

type AnimeDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'AnimeDetails'>;

function AnimeDetailsScreen ({route}: AnimeDetailsScreenProps) {
    const malRepo = useContext(MalRepoContext);
    const insets = useSafeAreaInsets();

    const [readMoreEnabled, enableReadMore] = useState(false);

    const {
        data,
        isFetched,
        isError,
    } = useQuery<AnimeDetails>({
        queryKey: ['anime-details', route.params.id],
        queryFn: () => malRepo.getAnimeDetails(route.params.id),
        placeholderData: ANIME_DETAILS_DEFAULT,
        initialData: ANIME_DETAILS_DEFAULT
    });

    return (
        <LoadableScreen isLoading={!isFetched} isError={isError}>
            <ScrollView contentContainerStyle={{padding: 12}} >
                <View style={styles.title_container}>
                    <View style={styles.image_container}>
                        <AnimeImageView picture_url={data.picture_url} />
                    </View>
                    {data.rank && 
                        <View style={styles.rank_indicator}>
                            <RankIndicator rank={data.rank} />
                        </View>
                    }
                    <Text style={styles.title}>{data.title}</Text>
                </View>
                <View style={styles.synopsis_container}>
                    <Text style={styles.synopsis_header}>Synopsis</Text>
                    <View style={styles.synopsis_body}>
                        <Text numberOfLines={readMoreEnabled ? undefined : SYNOPSIS_SHORT_LINES}>
                            {data.synopsis}
                        </Text>
                        <Pressable
                            onPress={() => enableReadMore(!readMoreEnabled)}
                            style={({pressed}) => [
                                styles.read_more_btn,
                                {
                                    backgroundColor: pressed ? 'rgba(0,0,0,0.15)' : undefined,
                                }
                            ]}
                        >
                            <Text style={styles.read_more} numberOfLines={1}>
                                {readMoreEnabled ? "Read less..." : "Read more..."}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </LoadableScreen>
    );
}

const styles = StyleSheet.create({
    title_container: {
        alignItems: 'center'
    },
    image_container: {
        height: 300
    },
    synopsis_container: {
        marginTop: 8,
        width: '100%'
    },
    synopsis_header: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 18,
        color: 'black'
    },
    synopsis_body: {
        padding: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'black',
        marginBottom: 8,
        textAlign: 'center'
    },
    read_more_btn: {
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    read_more: {
        color: 'blue', 
        fontWeight: 'bold',
        fontSize: 16,
    },
    rank_indicator: {
        flex: 1,
        marginVertical: 8
    }
});

export default AnimeDetailsScreen;