import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {Button, Text, Icon, Input} from '@ui-kitten/components';
// import auth from '@react-native-firebase/auth';

const LoginAdmin = ({ navigation }) => {
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

  const onLogin = () => {
    if(email === "adminmolidu@gmail.com" && password === "admin") {
      navigation.navigate('HomeAdmin');
    } else {
      alert('Anda belum terdaftar sebagai admin')
    }
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
        source={require('../../../../assets/images/login-icon.png')}
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
        <Button onPress={() => onLogin()}>Masuk</Button>
        <TouchableOpacity onPress={() => alert('Silahkan reset email anda dengan mengirim pesan ke email: molidulearning@gmail.com')}><Text style={styles.textForgot}>Lupa password?</Text></TouchableOpacity>
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
  },
  textForgot: {
    marginTop: 10,
  },
});


export default LoginAdmin;
