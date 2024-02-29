import { PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
/* @ts-ignore */
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type LoadableScreenType = PropsWithChildren<{
    isLoading: Boolean,
    isError: Boolean,
    retryFn?: () => void
}>;

function LoadableScreen({children, isLoading, isError, retryFn}: LoadableScreenType) {
    return isLoading ?
        <View style={styles.indicator_container}>
            <ActivityIndicator size={'large'} />
        </View>
    : isError ? 
        retryFn ? (
            <View style={styles.indicator_container}>
                <Pressable onPress={retryFn}>
                    <FontAwesome6 size={32} name={'rotate-right'} />
                </Pressable>
            </View>
        ) : (
            <View style={styles.indicator_container}>
                <FontAwesome6 size={64} name={'circle-exclamation'} />
            </View>
        )
    : (
        <>
            {children}
        </>
    );
}

const styles = StyleSheet.create({
    indicator_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoadableScreen;