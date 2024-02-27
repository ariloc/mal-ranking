import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrendingAnimeScreen from './TrendingAnimeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  // SafeAreaView?
  return (
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = "TrendingAnime"
                    component = {TrendingAnimeScreen}
                    options = {{title: "Trending Anime on MAL"}}
                />
            </Stack.Navigator>
          </NavigationContainer>
      </QueryClientProvider>
  );
}

export default App;
