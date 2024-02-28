import { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AnimeDetailsShort from '../data/AnimeDetailsShort';
import AnimeItemImageView from './AnimeItemImageView';

type AnimeItemViewProps = PropsWithChildren<{
    item: AnimeDetailsShort
}>;

function AnimeItemView ({item}: AnimeItemViewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.rank}>{item.rank}</Text>
            <AnimeItemImageView picture_url={item.picture_url} />
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
});

export default AnimeItemView;
