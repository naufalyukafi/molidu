import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button, Text, Icon, Input} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onDaftar = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            email,
          })
          .then(() => {
            Alert.alert(
              'Daftar Sukses',
              'Selamat anda telah terdaftar di molidu',
            );
            setEmail('');
            setPassword('');
            navigation.navigate('HomeScreen');
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Email Anda salah',
            'Sepertinya email yang anda masukan salah, mohon segera koreksi kembali!',
          );
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'User tidak ditemukan',
            'Sepertinya alamat email yang anda masukan tidak terdaftar di sistem, mohon koreksi kembali!',
          );
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert(
            'Password Anda salah',
            'Sepertinya passwod yang anda masukan salah, mohon segera koreksi kembali!',
          );
        } else {
          Alert.alert(error.code);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#E5E1E1',
          fontWeight: 'bold',
          paddingTop: 50,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Molidu Education
      </Text>
      <Image
        source={require('../../../assets/images/login-icon.png')}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Input
          value={email}
          label="Email"
          placeholder="Masukkan email anda"
          onChangeText={nextValue => setEmail(nextValue)}
          style={styles.input}
        />
        <Input
          value={password}
          label="Password"
          placeholder="Masukkan password anda"
          caption="Minimal harus ada 6 huruf"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
          style={styles.input}
        />
        <Button onPress={() => onDaftar()}>Daftar</Button>
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text> Have account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1890FF',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
  },
  input: {
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  textForgot: {
    marginTop: 10,
  },
});

export default Signup;
