/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {useColorScheme} from 'react-native';
import {Navigation} from './screens/Navigation';

function App(): JSX.Element {
  const DarkMode = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(DarkMode);

  return (
    <>
      <Navigation setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
    </>
  );
}

export default App;
