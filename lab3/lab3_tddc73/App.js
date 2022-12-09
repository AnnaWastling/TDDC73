import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import 'react-native-gesture-handler'
import HomeScreen from './src/HomeScreen'
import { screenOptions } from './src/styles'
import InfoScreen from './src/InfoScreen'
import { REACT_APP_GITHUB_TOKEN } from '@env'

const Stack = createStackNavigator()

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      //authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`, //don't work
      authorization: `Bearer ${"USEGITHUBTOKENHERE"}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
           <Stack.Screen
              name="Info"
              component={InfoScreen}
                  options={({
                    route: {
                      params: {
                        repository: { id, name },
                      },
                    },
                  }) => ({
                    name: id ? `Info ${id}: ${name}` : name,
                  })}

           />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  )
}