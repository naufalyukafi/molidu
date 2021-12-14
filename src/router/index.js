import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IntroScreen, LoginScreen, SignupScreen} from '../pages/auth';
// admin
import {LoginAdmin} from '../pages/admin/auth'
import {
  HomeAdmin, 
  AdminGuru, 
  AdminSiswa, 
  NewStudent, 
  EditStudent,
  NewTeacher,
  EditTeacher } from '../pages/admin/modules'
import {Button, Icon, OverflowMenu, MenuItem} from '@ui-kitten/components';
import SplashScreen from '../pages/modules/SplashScreen'
import {HomeScreen, RoomScreen, LessonScreen, GemarMembacaScreen} from '../pages/modules';
import {
  AbsensiSiswaScreen,
  FotoAbsensiScreen,
  DetailMataPelajaranScreen,
  UploadTugasScreen,
  RoomStudentScreen,
  UploadResumeScreen,
} from '../pages/modules/Siswa';
import {
  AbsensiGuruScreen,
  TugasGuruScreen,
  CreateChatRoomScreen,
  NewLessonScreen,
  RoomLessonScreen,
  SeeAssigmentScreen,
  GemarMembacaGuruScreen,
  ListBookGuruScreen,
  DetailBookTeacherScreen,
  ListResumeTeacherScreen,
  DetailResumeTeacherScreen
} from '../pages/modules/Guru';
import ChatSiswa from '../pages/modules/Siswa/Chat';
import UploadBookTeacher from '../pages/modules/Guru/GemarMembaca/Upload';

const Stack = createStackNavigator();

const Router = () => {
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([])
  const renderToggleButton = () => (
    <Button
      appearance="ghost"
      accessoryLeft={MoreIcon}
      onPress={() => setVisible(true)}
    />
  );

  const getData = async (key) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        // setCurrentUser(data)
        console.log("current user data", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  React.useEffect(async () => {
    await getData('user')
      .then(data => setCurrentUser(data))
      .catch(err => console.log(err))
    GoogleSignin.configure({
      webClientId: '736070341526-qgs3l787oh7pfkgktcnrftaos948jk8m.apps.googleusercontent.com',
      offlineAccess: true
    });
  }, []);
  
  const StarIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="plus-circle" />
  );
  const MoreIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="more-vertical" />
  );
  
  // console.log('current user ', currentUser)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        {
          // currentUser === undefined && 
          <>
                  <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                      headerTitle: false,
                      headerTransparent: true,
                      headerLeft: false,
                    }}
                  />
                   <Stack.Screen
                      name="IntroScreen"
                      component={IntroScreen}
                      options={{
                        headerTitle: false,
                        headerTransparent: true,
                        headerLeft: false,
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
          </>
        }
       
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: 'Molidu Education',
            headerLeft: false,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
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
        <Stack.Screen
          name="GrupGuru"
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
        <Stack.Screen
          name="GrupSiswa"
          component={ChatSiswa}
          options={({navigation}) => ({
            headerLeft: false,
            headerTitle: 'Grup Kelas',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="LessonGuru"
          component={LessonScreen}
          options={({navigation}) => ({
            headerLeft: false,
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

            headerRight: () => (
              <Button
                appearance="ghost"
                accessoryLeft={StarIcon}
                onPress={() => navigation.navigate('NewLesson')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="LessonSiswa"
          component={LessonScreen}
          options={({navigation}) => ({
            headerLeft: false,
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />
        

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
            title: route.params.item.name,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="NewLesson"
          component={NewLessonScreen}
          options={{
            headerTitle: 'Mata Pelajaran Baru',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="RoomLesson"
          component={RoomLessonScreen}
          options={({route, navigation}) => ({
            title: route.params.threadLesson.mapel,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
              <>
                <View style={styles.buttonContainer}>
                  <OverflowMenu
                    anchor={renderToggleButton}
                    visible={visible}
                    placement='bottom'
                    onBackdropPress={() => setVisible(false)}
                    backdropStyle={styles.backdrop}
                    >
                    <MenuItem title='Hasil Tugas Siswa' onPress={() => {
                        setVisible(false)
                        navigation.navigate('SeeAssigment', {threadLesson: route})
                      }
                    } />
                    <MenuItem title='Hapus Grup' onPress={() => {
                      firestore()
                      .collection('ThreadsLesson')
                      .doc(route.params.threadLesson._id)
                      .delete()   
                      .then(() => {
                        alert('Delete Sukses')
                        navigation.navigate('LessonGuru')
                      })
                      .catch((error) => alert(error))
                    }} />
                  </OverflowMenu>
                </View>
              </>
            ),
          })}
        
        />
        <Stack.Screen 
          name="SeeAssigment"
          component={SeeAssigmentScreen}
          options={() => ({
            title: 'Hasil Tugas Siswa',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="RoomStudent"
          component={RoomStudentScreen}
          options={({route}) => ({
            title: route.params.threadLesson.mapel,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
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

        <Stack.Screen 
          name="GemarMembaca"
          component={GemarMembacaScreen}
          options={{
            headerTitle: 'Gemar Membaca',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="UploadBook"
          component={UploadBookTeacher}
          options={{
            headerTitle: 'Tambah Buku',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="DetailBook"
          component={DetailBookTeacherScreen}
          options={({route}) => ({
            title: route.params.dataBook.name,
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="ListBookTeacher"
          component={ListBookGuruScreen}
          options={({navigation}) => ({
            headerTitle: 'Daftar Buku',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

            headerRight: () => (
              <Button
                appearance="ghost"
                accessoryLeft={StarIcon}
                onPress={() => navigation.navigate('UploadBook')}
              />
            ),
          })}
        />

        <Stack.Screen
          name="ListBookStudent"
          component={ListBookGuruScreen}
          options={({navigation}) => ({
            headerTitle: 'Daftar Buku',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="UploadResume"
          component={UploadResumeScreen}
          options={({navigation}) => ({
            headerTitle: 'Kumpulkan Resume',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="ListResume"
          component={ListResumeTeacherScreen}
          options={({navigation}) => ({
            headerTitle: 'Daftar Resume',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="DetailResume"
          component={DetailResumeTeacherScreen}
          options={({navigation}) => ({
            headerTitle: 'Detail Resume',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          })}
        /> 

        {/* admin */}
        <Stack.Screen 
          name="LoginAdmin"
          component={LoginAdmin}
          options={{
            headerTitle: 'Login Admin',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="HomeAdmin"
          component={HomeAdmin}
          options={{
            headerTitle: 'Home Admin',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="AdminGuru"
          component={AdminGuru}
          options={{
            headerTitle: 'Admin Guru',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />


        <Stack.Screen 
          name="NewTeacher"
          component={NewTeacher}
          options={{
            headerTitle: 'Tambah Guru',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="EditTeacher"
          component={EditTeacher}
          options={{
            headerTitle: 'Edit Guru',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />


        <Stack.Screen 
          name="AdminSiswa"
          component={AdminSiswa}
          options={{
            headerTitle: 'Admin Siswa',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="NewStudent"
          component={NewStudent}
          options={{
            headerTitle: 'Tambah Siswa',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="EditStudent"
          component={EditStudent}
          options={{
            headerTitle: 'Edit Siswa',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#ADF1B4'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});