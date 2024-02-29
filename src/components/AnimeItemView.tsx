import { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import AnimeDetailsShort from '../data/AnimeDetailsShort';
import AnimeImageView from './AnimeItemImageView';

type AnimeItemViewProps = PropsWithChildren<{
    item: AnimeDetailsShort
    navigateToDetails: (id: number, headerTitle: string) => void
}>;

function AnimeItemView ({item, navigateToDetails}: AnimeItemViewProps) {
    return (
        <Pressable
            onPress={() => navigateToDetails(item.id, item.title)} 
            style={({pressed}) => [
                styles.container,
                {
                    backgroundColor: Platform.OS === 'ios' && pressed ? 'rgba(0,0,0,0.15)' : undefined
                }
            ]} 
            android_ripple={{color: 'gray'}}
        >
            <Text style={styles.rank} adjustsFontSizeToFit={true} numberOfLines={1}>{item.rank}</Text>
            <View style={styles.image_container}>
                <AnimeImageView picture_url={item.picture_url} />
            </View>
            <View style={styles.text_container}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>
                    {item.title}
                </Text>
            </View>
        </Pressable>
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
    image_container: {
        marginEnd: 16
    },
    text_container: {
        width: '100%',
        flex: 1
    },
    rank: {
        fontSize: 24,
        width: 24,
        textAlign: 'center',
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
