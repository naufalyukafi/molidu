import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button, Icon, Input, Text} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const NewStudent = ({navigation}) => {
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

  const onNewStudent = () => {
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
              role: 'student',
            }).then(() => {
            Alert.alert(
              'Akun Siswa',
              'Siswa berhasil dibuat',
            );
            setName('');
            setClassRoom('');
            setEmail('');
            setPassword('');
            navigation.push('AdminSiswa');
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
          placeholder="Masukkan nama siswa"
          onChangeText={nextValue => setName(nextValue)}
          style={styles.input}
        />
        <Input
          value={classRoom}
          label="Kelas"
          placeholder="Masukkan kelas siswa"
          onChangeText={nextValue => setClassRoom(nextValue)}
          style={styles.input}
        />
        <Input
          value={email}
          label="Email"
          placeholder="Masukkan email siswa"
          onChangeText={nextValue => setEmail(nextValue)}
          style={styles.input}
        />
        <Input
          value={password}
          label="Password"
          placeholder="Masukkan password siswa"
          caption="Minimal harus ada 6 huruf"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
          style={styles.input}
        />
        {((name != "") && (classRoom != "") && (email != "") && (password != "")) ?
        <Button onPress={onNewStudent}>Tambah Siswa</Button> : <Button disabled>Tambah Siswa</Button> }
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

export default NewStudent;
