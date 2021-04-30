import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet, Image, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Text, Button} from '@ui-kitten/components';

const Home = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const onLogOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('Anda berhasil keluar akun!'));
    navigation.navigate('IntroScreen');
  };
  const onAbsensi = () => {
    if (user.email === 'molidulearning@gmail.com') {
      navigation.navigate('AbsensiGuru');
    } else {
      navigation.navigate('AbsensiSiswa');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.image}>
          <Image
            source={require('../../../../assets/images/dashboard-image.png')}
          />
        </View>
        <Text style={styles.welcome}>Selamat datang, {user.email}!</Text>

        <Button style={styles.card} onPress={() => onAbsensi()}>
          Absensi Siswa
        </Button>
        <Button style={styles.card} onPress={() => navigation.navigate('Grup')}>
          Grup Kelas
        </Button>
        <Button
          style={styles.card}
          onPress={() => navigation.navigate('DashboardMataPelajaran')}>
          Mata Pelajaran
        </Button>
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
    marginTop: 20,
    textAlign: 'center',
  },
  welcome: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Home;
