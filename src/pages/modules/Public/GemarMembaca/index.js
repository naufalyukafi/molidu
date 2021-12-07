import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const GemarMembaca = ({navigation}) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = React.useState();

    // Handle user state changes
    const onAuthStateChanged = user => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    const onUploadBook = () => {
        if(user.email === 'yukafit@gmail.com') {
            navigation.navigate('ListBookTeacher')
        } else {
            navigation.navigate('ListBookStudent')
        }
    }

    const onResumeBook = () => {
        if(user.email === 'yukafit@gmail.com') {
            navigation.navigate('ListResume')
        } else {
            navigation.navigate('UploadResume')
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if (initializing) return null;
    
    if (!user) {
        return (
            <View><Text>Login</Text></View>
        );
    }
    return (
        <View style={styles.container}>
        <View style={styles.wrapperMenus}>
            <TouchableOpacity style={styles.box} onPress={onUploadBook}>
                <Image
                    source={require('../../../../assets/images/uploadbuku.png')}
                    style={styles.image}
                />
                {user.email === 'yukafit@gmail.com' ? <Text>Upload Buku</Text> : <Text>Baca Buku</Text> }

            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={onResumeBook}>
                <Image
                    source={require('../../../../assets/images/lihatresume.png')}
                    style={styles.image}
                />
                {user.email === 'yukafit@gmail.com' ? <Text>Lihat Resume</Text> : <Text>Kumpulkan Resume</Text> }
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  wrapperMenus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  box: {
    width: '44%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
    paddingBottom: 10
  },
  image: {
      width: 150,
      height: 150,
  }
});


export default GemarMembaca;