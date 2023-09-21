/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {Navigation} from './screens/Navigation';
import {ApolloProvider} from '@apollo/client';
import client from './apollo/client';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  const DarkMode = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(DarkMode);

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <ApolloProvider client={client}>
      <Navigation setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
    </ApolloProvider>
  );
}

export default App;
