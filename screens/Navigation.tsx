import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from './Registration';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeType} from '../types';
import Login from './Login';
import SuccessRegistration from './SuccessRegistration';

const Stack: any = createNativeStackNavigator();

export const Navigation = ({isDarkMode}: ThemeType) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Registration"
          component={Registration}
          initialParams={{isDarkMode: isDarkMode}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{isDarkMode: isDarkMode}}
        />
        <Stack.Screen
          name="SuccessRegistration"
          component={SuccessRegistration}
          initialParams={{isDarkMode: isDarkMode}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
