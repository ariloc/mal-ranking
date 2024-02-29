import React, { PropsWithChildren, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrendingAnimeScreen from './src/screens/TrendingAnimeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import AnimeDetailsScreen from './src/screens/AnimeDetailsScreen';
import { IMalRepository, MalRepository } from './src/api/MalRepository';
import { SafeAreaView } from 'react-native-safe-area-context';

// Stack
export type RootStackParamList = {
    TrendingAnime: undefined
    AnimeDetails: { id: number, headerTitle: string }
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();


// Repo
export const MalRepoContext = createContext<IMalRepository>({} as IMalRepository);

function MalRepoProvider({children}: PropsWithChildren<{}>) {
    const malRepo: IMalRepository = new MalRepository()

    return (
        <MalRepoContext.Provider value={malRepo}>
            {children}
        </MalRepoContext.Provider>
    );
}


function App() {
    return (
        <MalRepoProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='TrendingAnime'>
                        <Stack.Screen
                            name = "TrendingAnime"
                            component = {TrendingAnimeScreen}
                            options = {{title: "Trending Anime on MAL"}}
                        />
                        <Stack.Screen
                            name = "AnimeDetails"
                            component = {AnimeDetailsScreen}
                            options = {({route}) => {return {title: route.params.headerTitle};}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </QueryClientProvider>
        </MalRepoProvider>
    );
}

export default App;
