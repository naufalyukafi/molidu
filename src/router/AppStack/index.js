import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../../pages/modules';
import {AbsensiGuruScreen, ChatGuruScreen} from '../../pages/modules/Guru';
import {
  AbsensiSiswaScreen,
  ChatSiswaScreen,
  FotoAbsensiScreen,
} from '../../pages/modules/Siswa';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Molidu Education',
          headerLeft: false,
          headerStyle: {backgroundColor: '#1890FF'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const AbsensiStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Foto"
        component={FotoAbsensiScreen}
        options={{
          headerTitle: 'Foto Kehadiran Siswa',
          headerStyle: {backgroundColor: '#1890FF'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatGuruScreen}
        options={{
          headerTitle: 'Pesan Grup',
          headerStyle: {backgroundColor: '#1890FF'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen name="Beranda" component={HomeStack} />
      <Tab.Screen name="Presensi" component={AbsensiStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
    </Tab.Navigator>
  );
};

export {HomeStack, AbsensiStack, ChatStack};
