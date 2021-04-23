import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Text, Button} from '@ui-kitten/components';

const Home = ({ navigation }) => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onLogOut = () => {
    auth()
    .signOut()
    .then(() => Alert.alert('Anda berhasil keluar akun!'));
    navigation.navigate('IntroScreen')
  }

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
    <View>
      <Text>Home Screen {user.email}</Text>
      <Button onPress={() => onLogOut()}>Logout</Button>
    </View>
  )
  ;
};

export default Home;
