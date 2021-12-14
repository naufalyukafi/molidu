import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Text, Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = React.useState([]);

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const onLogOut = async () => {
    try {
        await auth().signOut();
        await AsyncStorage.clear()
        navigation.navigate('IntroScreen');
    } catch (e) {
        console.log(e);
    }
  };
  const onAbsensi = () => {
    if (user.email === 'yukafit@gmail.com') {
      navigation.navigate('AbsensiGuru');
    } else {
      navigation.navigate('AbsensiSiswa');
    }
  };
  const onGrup = () => {
    if (user.email === 'yukafit@gmail.com') {
      navigation.navigate('GrupGuru');
    } else {
      navigation.navigate('GrupSiswa');
    }
  };
  const onLesson = () => {
    if (user.email === 'yukafit@gmail.com') {
      navigation.navigate('LessonGuru');
    } else {
      navigation.navigate('LessonSiswa');
    }
  };

  const getData = async (key) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getData('user')
    .then(data => console.log(data))
    .catch(err => console.log(err))
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.isNotLogin}>
        <Button onPress={() => navigation.navigate('IntroScreen')}>
          Login
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View >
        <View >
          <Image
            source={require('../../../../assets/images/dashboard-image.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.welcome}>Selamat datang, {user.email}!</Text>
        <View style={styles.wrapperMenus}>
          <TouchableOpacity style={styles.box} onPress={() => onAbsensi()}>
              <Image
                  source={require('../../../../assets/images/absensi.png')}
                  style={styles.icon}
              />
              <Text>Absensi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => onLesson()}>
              <Image
                  source={require('../../../../assets/images/matapelajaran.png')}
                  style={styles.icon}
              />
              <Text>Mata Pelajaran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => onGrup()}>
              <Image
                  source={require('../../../../assets/images/groupkelas.png')}
                  style={styles.icon}
              />
              <Text>Grup Kelas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('GemarMembaca')} >
              <Image
                  source={require('../../../../assets/images/gemarmembaca.png')}
                  style={styles.icon}
              />
              <Text>Gemar Membaca</Text>
          </TouchableOpacity>
        </View>
        <Button style={styles.button} onPress={() => onLogOut()}>Keluar</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
  },
  icon: {
    width: '75%'
  },
  wrapperMenus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20
  },
  box: {
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    borderWidth: 1
  },
  button: {
    marginTop: 10,
    marginBottom: 20
  },
  welcome: {
    textAlign: 'center',
    marginTop: 20,
  },
  isNotLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;