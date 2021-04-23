import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {LoginScreen, SignupScreen, IntroScreen} from '../pages/auth';
import {HomeScreen} from '../pages/modules';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '109794889729-vgqf8vqoeivm6l46a5v3h4k27gclqmmn.apps.googleusercontent.com',
    });
  }, []);
  return (
    <NavigationContainer>
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
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{title: 'Molidu'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainApp = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = auth().currentUser;
    setUser(userInfo);
  }, []);

  return (
    <>
      {/* {
                user.email === "molidu@gmail.com" ?  */}
      <Tab.Navigator initialRouteName="HomeScreen">
        <Tab.Screen
          name="HomeScreen"
          options={{title: 'Home'}}
          component={HomeScreen}
        />
        <Tab.Screen name="Chat" component={HomeScreen} />
      </Tab.Navigator>
      {/*  : */}
      {/* <Tab.Navigator initialRouteName="HomeScreen">
                        <Tab.Screen name="HomeScreen" options={{title: 'Home'}} component={HomeScreen} />
                        <Tab.Screen name="ProjectScreen" options={{title: 'Tugas'}} component={ProjectScreen} />
                        <Tab.Screen name="FormAbsenScreen" options={{title: 'Absensi'}} component={FormAbsenScreen} />
                    </Tab.Navigator>
            } */}
    </>
  );
};

export default Router;
