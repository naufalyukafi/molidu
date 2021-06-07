import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {IntroScreen, LoginScreen, SignupScreen} from '../pages/auth';
import {Button, Icon, IndexPath, Layout, Popover, Select, SelectItem, Text, OverflowMenu, MenuItem} from '@ui-kitten/components';
import {HomeScreen, RoomScreen, LessonScreen} from '../pages/modules';
import {
  AbsensiSiswaScreen,
  FotoAbsensiScreen,
  DetailMataPelajaranScreen,
  UploadTugasScreen,
  RoomStudentScreen,
} from '../pages/modules/Siswa';
import {
  AbsensiGuruScreen,
  TugasGuruScreen,
  CreateChatRoomScreen,
  NewLessonScreen,
  RoomLessonScreen,
  SeeAssigmentScreen
} from '../pages/modules/Guru';
import ChatSiswa from '../pages/modules/Siswa/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
  const [visible, setVisible] = useState(false);
  const [dataID, setDataID] = useState([]);

  const renderToggleButton = () => (
    <Button
      appearance="ghost"
      accessoryLeft={MoreIcon}
      onPress={() => setVisible(true)}
    />
  );
  
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '736070341526-qgs3l787oh7pfkgktcnrftaos948jk8m.apps.googleusercontent.com',
      offlineAccess: true
    });
  }, []);
  
  const LogOutIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="log-out" />
  )
  const StarIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="plus-circle" />
  );
  const MoreIcon = props => (
    <Icon {...props} style={styles.icon} fill="#fff" name="more-vertical" />
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
            title: route.params.thread.name,
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
              // <Popover 
              //   anchor={renderToggleButton}
              //   visible={visible}
              //   // placement='left start'
              //   onBackdropPress={() => setVisible(false)}
              // >
              //   <Layout style={styles.content}>
              //     
                  
              //   </Layout>
              // </Popover>
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
                      // alert(`${route.params.threadLesson._id}/Messages`)
                      firestore()
                      .collection('ThreadsLesson')
                      .doc(route.params.threadLesson._id)
                      .delete()   
                      .then(() => {
                        alert('Delete Sukses')
                        navigation.navigate('LessonGuru')
                      })
                      .catch((error) => alert(error))
                      
                      
                      // .doc('sPIDDLiIZogzdKUqtguB').delete()
                      // .then(() => {
                      //   alert('Semua pesan berhasil dihapus');
                      //   navigation.navigate('LessonGuru')
                      // })
                      // .catch((error) => alert(error));
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
        {/* <Stack.Screen
          name="DetailMataPelajaran"
          component={DetailMataPelajaranScreen}
          options={{
            headerTitle: 'Mata Pelajaran',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        /> */}
        {/* <Stack.Screen
          name="ChatGuru"
          component={ChatMateriGuruScreen}
          options={{
            headerTitle: 'Materi',
            headerStyle: {backgroundColor: '#1890FF'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        /> */}
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

//sudah absen gak bisa absen lagi