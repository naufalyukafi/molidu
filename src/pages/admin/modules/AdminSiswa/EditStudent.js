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
import Loading from '../../../../components/Loading';
const EditStudent = ({route, navigation}) => {
    const { userId, userName  } = route.params;
    const [showBox, setShowBox] = useState(true)
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [classRoom, setClassRoom] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [loading, setLoading] = useState(true)
    const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = props => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    React.useEffect(() => {
        firestore()
        .collection('Users')
        .where('name', '==', userName)
        .get()
        .then(querySnapshot => {
            // const roleStudent = querySnapshot.docs.map(item => item.data().role === "student");
            // console.log(roleStudent)
            const getUsers = querySnapshot.docs.map(documentSnapshot => {
            return {
                _id: documentSnapshot.id,
                // give defaults
                email: '',
                role: '',
                name: '',
                classRoom: '',
                password: '',
                ...documentSnapshot.data(),
            };
            });

            // const roleStudent 

            // const roleStudent = getUsers.map(role => role.role === "student")
            setUsers(getUsers)
            setName(getUsers[0].name)
            setClassRoom(getUsers[0].classRoom)
            setEmail(getUsers[0].email)
            setPassword(getUsers[0].password)
            if (loading) {
            setLoading(false);
            }
        });
    }, [])

    if(loading) return <Loading />
    console.log(users)

    const onEdit = () => {
        if(userId != '') {
            Alert.alert(
              "Apa anda yakin?",
              'Apakah anda yakin ingin mengeditnya?',
              [
                {
                  text: "Iya",
                  onPress: () => {
                    firestore()
                    .collection('Users')
                    .doc(userId)
                    .update({
                        name, classRoom, email, password
                    })
                    .then(() => {
                        alert('Edit siswa sukses')
                        navigation.push('AdminSiswa')
                    })
                    .catch(err => alert(err))
                  },
                },
                {
                  text: "Tidak",
                },
              ]
            );
          }
    }
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
        <Button onPress={onEdit}>Edit Siswa</Button>
        {/* {((name != "") && (classRoom != "") && (email != "") && (password != "")) ?
        <Button onPress={onNewStudent}>Tambah Siswa</Button> : <Button disabled>Tambah Siswa</Button> } */}
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

export default EditStudent;
