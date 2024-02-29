import { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
/* @ts-ignore */
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type LoadableScreenType = PropsWithChildren<{
    isLoading: Boolean,
    isError: Boolean
}>;

function LoadableScreen({children, isLoading, isError}: LoadableScreenType) {
    return isLoading ?
        <View style={styles.indicator_container}>
            <ActivityIndicator size={'large'} />
        </View>
    : isError ? (
        <View style={styles.indicator_container}>
            <FontAwesome6 size={64} name={'circle-exclamation'} />
        </View>
    ) : (
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