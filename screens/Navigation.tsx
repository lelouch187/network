import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from './Registration';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import SuccessRegistration from './SuccessRegistration';
import Main from './Main';
import Profile from './Profile';
import FullPost from './FullPost';
import CreatePost from './CreatePost';

const Stack: any = createNativeStackNavigator();

type NavigationPropsType = {
  isDarkMode: boolean;
  setIsDarkMode: any;
};

export const Navigation = ({
  isDarkMode,
  setIsDarkMode,
}: NavigationPropsType) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Registration"
          children={() => <Registration isDarkMode={isDarkMode} />}
        />
        <Stack.Screen
          name="Profile"
          children={() => <Profile isDarkMode={isDarkMode} />}
        />
        <Stack.Screen
          name="Main"
          children={() => (
            <Main isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          )}
        />
        <Stack.Screen
          name="Login"
          children={() => <Login isDarkMode={isDarkMode} />}
        />
        <Stack.Screen
          name="SuccessRegistration"
          children={() => <SuccessRegistration isDarkMode={isDarkMode} />}
        />
        <Stack.Screen
          name="CreatePost"
          children={() => <CreatePost isDarkMode={isDarkMode} />}
        />
        <Stack.Screen
          name="FullPost"
          children={() => <FullPost isDarkMode={isDarkMode} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
