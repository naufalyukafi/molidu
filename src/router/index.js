import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {IntroScreen, LoginScreen, SignupScreen} from '../pages/auth';
import {Button, Icon} from '@ui-kitten/components';
import {HomeScreen, RoomScreen} from '../pages/modules';
import {
  AbsensiSiswaScreen,
  FotoAbsensiScreen,
  MataPelajaranDashboardScreen,
  DetailMataPelajaranScreen,
  UploadTugasScreen,
} from '../pages/modules/Siswa';
import {
  AbsensiGuruScreen,
  TugasGuruScreen,
  ChatMateriGuruScreen,
  CreateChatRoomScreen,
} from '../pages/modules/Guru';
import ChatSiswa from '../pages/modules/Siswa/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
  const [user, setUser] = useState({});

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '109794889729-vgqf8vqoeivm6l46a5v3h4k27gclqmmn.apps.googleusercontent.com',
    });
    const userInfo = auth().currentUser;
    setUser(userInfo);
  }, []);
  const StarIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="plus-circle" />
  );
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
        <Stack.Screen
          name="AbsensiSiswa"
          component={AbsensiSiswaScreen}
          options={{
            headerTitle: 'Presensi Online',
            headerLeft: false,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerTitleStyle: {fontSize: 25},
          }}
        />
        <Stack.Screen
          name="FotoAbsensiSiswa"
          component={FotoAbsensiScreen}
          options={{
            headerTitle: 'Foto Kehadiran Siswa',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AbsensiGuru"
          component={AbsensiGuruScreen}
          options={{
            headerLeft: false,
            headerTitle: 'Daftar Kehadiran Siswa',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        {user.email === 'molidulearning@gmail.com' ? (
          <Stack.Screen
            name="Grup"
            component={ChatSiswa}
            options={({navigation}) => ({
              headerLeft: false,
              headerTitle: 'Grup Kelas',
              headerStyle: {backgroundColor: '#1890FF'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  appearance="ghost"
                  accessoryLeft={StarIcon}
                  onPress={() => navigation.navigate('NewGrup')}
                />
              ),
            })}
          />
        ) : (
          <Stack.Screen
            name="Grup"
            component={ChatSiswa}
            options={({navigation}) => ({
              headerLeft: false,
              headerTitle: 'Grup Kelas',
              headerStyle: {backgroundColor: '#1890FF'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            })}
          />
        )}

        <Stack.Screen
          name="NewGrup"
          component={CreateChatRoomScreen}
          options={{
            headerTitle: 'Grup Baru',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={({route}) => ({
            title: route.params.thread.name,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="DashboardMataPelajaran"
          component={MataPelajaranDashboardScreen}
          options={{
            headerLeft: false,
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DetailMataPelajaran"
          component={DetailMataPelajaranScreen}
          options={{
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ChatGuru"
          component={ChatMateriGuruScreen}
          options={{
            headerTitle: 'Materi',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Chat Materi"
          component={DetailMataPelajaranScreen}
          options={{
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="UploadTugas"
          component={UploadTugasScreen}
          options={{
            headerTitle: 'Pemgumpulan Tugas',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="TugasGuru"
          component={TugasGuruScreen}
          options={{
            headerTitle: 'Hasil Pengumpulan Tugas',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
});
