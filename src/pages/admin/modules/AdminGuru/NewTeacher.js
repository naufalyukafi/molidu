import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button, Icon, Input, Text} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const NewTeacher = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [classRoom, setClassRoom] = useState('');
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

  const onNewTeacher = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
              createdAt: new Date().getTime(),
              name,
              classRoom,
              email,
              password,
              role: 'teacher',
            }).then(() => {
            Alert.alert(
              'Akun Guru',
              'Guru berhasil dibuat',
            );
            setName('');
            setClassRoom('');
            setEmail('');
            setPassword('');
            navigation.push('AdminGuru');
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        alert(error)
      })
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          value={name}
          label="Name"
          placeholder="Masukkan nama guru"
          onChangeText={nextValue => setName(nextValue)}
          style={styles.input}
        />
        <Input
          value={classRoom}
          label="Kelas"
          placeholder="Masukkan kelas guru"
          onChangeText={nextValue => setClassRoom(nextValue)}
          style={styles.input}
        />
        <Input
          value={email}
          label="Email"
          placeholder="Masukkan email guru"
          onChangeText={nextValue => setEmail(nextValue)}
          style={styles.input}
        />
        <Input
          value={password}
          label="Password"
          placeholder="Masukkan password guru"
          caption="Minimal harus ada 6 huruf"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
          style={styles.input}
        />
        {((name != "") && (classRoom != "") && (email != "") && (password != "")) ?
        <Button onPress={onNewTeacher}>Tambah Guru</Button> : <Button disabled>Tambah Guru</Button> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 50
  },
  input: {
    width: '90%',
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
});

export default NewTeacher;
