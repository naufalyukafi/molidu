import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Alert, 
  TouchableOpacity,
  RefreshControl, 
  Dimensions } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { Icon, Button } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../../components/Loading';
import TableAdmin from '../../../../components/Table/TableAdmin';

const AdminGuru = ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState(['nama', 'kelas', 'Action'])

    const EditIcon = (props) => (
      <Icon {...props} name='edit-2' style={styles.iconAction} fill="#F9B915" />
    );

    const TrashIcon = (props) => (
      <Icon {...props} name='trash' style={styles.iconAction} fill="#FF0000" />
    )

    const handleDelete = (userId, userName) => {
      if(userId != '') {
        Alert.alert(
          "Apa anda yakin?",
          `Apakah anda yakin ingin menghapus user ${userName}`,
          [
            {
              text: "Iya",
              onPress: () => {
                firestore()
                .collection("Users")
                .doc(userId)
                .delete()
                .then(() => {
                  Alert('Success', "Anda berhasil menghapus")
                })
                .catch(err => navigation.push('AdminGuru'))
              },
            },
            {
              text: "Tidak",
            },
          ]
        );
      }
    } 

    const dataTable = users.map((user) => [
      user.name, user.classRoom,
      <View style={styles.action}> 
        <Button
          appearance='ghost'
          accessoryLeft={EditIcon}
          onPress={() => navigation.navigate('EditTeacher', {
            userId: user._id,
            userName: user.name
          })}
        />
        <Button
          appearance='ghost'
          accessoryLeft={TrashIcon}
          onPress={() => handleDelete(user._id, user.name)}
        /> 
      </View>
    ])



    useEffect(() => {
      firestore()
      .collection('Users')
      .where('role', '==', 'teacher')
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
            ...documentSnapshot.data(),
          };
        });

        // const roleStudent 

        // const roleStudent = getUsers.map(role => role.role === "student")
        setUsers(getUsers);
        
        if (loading) {
          setLoading(false);
        }
      });
    }, [])

    if(loading) return <Loading />

    return <TableAdmin title={title} dataTable={dataTable} onNewPage={() => navigation.navigate('NewTeacher')} />

};

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row'
  },
  icon: {
    width: 50,
    height: 55,
  },
  iconAction: {
    width: 30,
    height: 30
  }
});

export default AdminGuru