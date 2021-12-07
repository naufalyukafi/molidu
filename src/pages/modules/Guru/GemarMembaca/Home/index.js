import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const GemarMembacaGuru = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperMenus}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ListBookTeacher')}>
            <Image
                source={require('../../../../../assets/images/uploadbuku.png')}
                style={styles.image}
            />
            <Text>Upload Buku</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AdminSiswa')}>
            <Image
                source={require('../../../../../assets/images/lihatresume.png')}
                style={styles.image}
            />
            <Text>Lihat Resume</Text>
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


export default GemarMembacaGuru;