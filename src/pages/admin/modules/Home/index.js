import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const HomeAdmin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}>
        Selamat Datang Admin, Molidu!
      </Text>
      <View style={styles.wrapperMenus}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AdminGuru')}>
            <Image
                source={require('../../../../assets/images/logoguruadmin.png')}
                style={styles.image}
            />
            <Text>Data Guru</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AdminSiswa')}>
            <Image
                source={require('../../../../assets/images/logosiswaadmin.png')}
                style={styles.image}
            />
            <Text>Data Siswa</Text>
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
});


export default HomeAdmin;