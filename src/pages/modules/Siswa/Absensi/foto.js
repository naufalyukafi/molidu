import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
const FotoIcon = props => (
  <Icon {...props} style={styles.icon} fill="#8F9BB3" name="camera" />
);

const FotoAbsensi = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  const getCurrentDate = `${date} - ${month} - ${year}`;

  return (
    <View style={styles.container}>
      <View style={styles.fotoForm}>
        <Button appearance="ghost" accessoryLeft={FotoIcon} />
        <Text>Pencet gambar foto</Text>
      </View>
      {/* <Image
        source={require('../../../../assets/images/dashboard-image.png')}
        style={styles.image}
      /> */}
      <Text>Tanggal: {getCurrentDate}</Text>
      <Button style={styles.submitBottom}>Kirim Foto</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  fotoForm: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    borderBottomLeftRadius: 150,
    borderBottomEndRadius: 150,
    borderTopEndRadius: 150,
    borderTopLeftRadius: 150,
    marginBottom: 20,
    justifyContent: 'center',
    borderColor: 'red',
    alignItems: 'center',
  },
  submitBottom: {
    width: '100%',
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default FotoAbsensi;
