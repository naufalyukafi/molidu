import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
const AbsensiSiswa = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Text
        style={{
          color: '#E5E1E1',
          fontWeight: 'bold',
          paddingTop: 50,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Molidu Education
      </Text> */}
      <Image
        source={require('../../../../assets/images/presensi.png')}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Button
          style={styles.bottomAbsensi}
          onPress={() => navigation.navigate('FotoAbsensiSiswa')}>
          Hadir
        </Button>
        <Button
          style={styles.bottomAbsensi}
          onPress={() =>
            Alert.alert(
              'Izin Tidak Masuk Sekolah',
              'Harap melakukan konfirmasi ke nomor Whatsapp ini: 08233425345',
            )
          }>
          Izin
        </Button>
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
  image: {
    marginBottom: 30,
    marginTop: 80,
  },
  bottomAbsensi: {
    marginBottom: 20,
  },
});

export default AbsensiSiswa;
