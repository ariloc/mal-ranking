import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { useState, PropsWithChildren } from "react";
/* @ts-ignore */
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; 

type AnimeItemImageViewProps = PropsWithChildren<{
    picture_url: string | null | undefined
}>

function AnimeItemImageView ({picture_url}: AnimeItemImageViewProps) {
    const [isLoadingImage, setLoadingImage] = useState(picture_url != null);
    const [loadingError, setLoadingError] = useState(picture_url == null);

    return (
        <View style={[
            styles.picture_size, 
            styles.picture_container,
            (isLoadingImage || loadingError) && styles.picture_overlay
        ]}>
            {loadingError ? 
                <FontAwesome6 size={18} name={'circle-exclamation'} />
            : 
            <>
                <Image
                    source={{uri: picture_url!}}
                    onLoadStart={() => {setLoadingImage(true)}}
                    onLoadEnd={() => {setLoadingImage(false)}}
                    onError={() => setLoadingError(true)}
                    style={[styles.picture_size, styles.picture]}
                />
                {isLoadingImage && <ActivityIndicator style={{position: 'absolute'}} />}
            </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    picture_container: {
        marginEnd: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture_size: {
        height: '100%',
        aspectRatio: 9/14,
    },
    picture: {
        resizeMode: 'contain',
    },
    picture_overlay: {
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
});

export default AnimeItemImageView;