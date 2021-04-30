import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {IntroScreen, LoginScreen, SignupScreen} from '../../pages/auth';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="IntroScreen">
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerLeft: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerTitle: 'Daftar Akun',
        }}
      />
    </Stack.Navigator>
  );
};

export {LoginScreen};
