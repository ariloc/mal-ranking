import { PropsWithChildren, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AnimeDetailsShort from './src/data/AnimeDetailsShort';

type AnimeItemViewProps = PropsWithChildren<{
    item: AnimeDetailsShort
}>;

function AnimeItemView ({item}: AnimeItemViewProps) {
    const [isLoadingImage, setLoadingImage] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.rank}>{item.rank}</Text>
            <View>
                <Image 
                    source={{uri: item.picture_url}}
                    onLoadStart={() => {setLoadingImage(true)}}
                    onLoadEnd={() => {setLoadingImage(false)}}
                    style={styles.picture}
                />
                {isLoadingImage && <ActivityIndicator style={styles.loading_indicator} />}
            </View>
            <View style={styles.text_container}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>
                    {item.title}
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        color: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text_container: {
        width: '100%',
        flex: 1
    },
    rank: {
        fontSize: 20,
        marginEnd: 16,
        color: 'black',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginBottom: 4,
    },
    loading_indicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
    picture: {
        height: '100%',
        aspectRatio: 9/14,
        resizeMode: 'contain',
        marginEnd: 16,
    }
});

export default AnimeItemView;
