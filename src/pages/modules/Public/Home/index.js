import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet, Image, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Text, Button} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../../components/Loading';

const Home = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState()
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true)
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
    if (user === 'molidulearning@gmail.com') {
      navigation.navigate('AbsensiGuru');
    } else {
      navigation.navigate('AbsensiSiswa');
    }
  };
  const onGrup = () => {
    if (user === 'teacher') {
      navigation.navigate('GrupGuru');
    } else {
      navigation.navigate('GrupSiswa');
    }
  };
  const onLesson = () => {
    if (user === 'molidulearning@gmail.com') {
      navigation.navigate('LessonGuru');
    } else {
      navigation.navigate('LessonSiswa');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // firestore()
    //   .collection('Users')
    //   // .where('email', '==', user.email)
    //   .get()
    //   .then(querySnapshot => {
    //     // const roleStudent = querySnapshot.docs.map(item => item.data().role === "student");
    //     // console.log(roleStudent)
    //     const getUsers = querySnapshot.docs.map(documentSnapshot => {
    //       return {
    //         _id: documentSnapshot.id,
    //         // give defaults
    //         email: '',
    //         role: '',
    //         name: '',
    //         classRoom: '',
    //         ...documentSnapshot.data(),
    //       };
    //     });

    //     // const roleStudent 

    //     // const roleStudent = getUsers.map(role => role.role === "student")
    //     setUsers(getUsers[0]);
        
    //     if (loading) {
    //       setLoading(false);
    //     }
    //   });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading || !user) return <Loading />
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  // console.log("users", users.email)
  // console.log("user", user.email)
  return (
    <ScrollView style={styles.wrapper}>
      <View >
        <View >
          <Image
            source={require('../../../../assets/images/dashboard-image.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.welcome}>Selamat datang, {user.name}!</Text>
        <Button style={styles.card} onPress={() => onAbsensi()}>
          Absensi Siswa
        </Button>
        <Button style={styles.card} onPress={() => onGrup()}>
          Grup Kelas
        </Button>
        <Button
          style={styles.card}
          onPress={() => onLesson()}  
        >
          
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
    width: '100%',
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
