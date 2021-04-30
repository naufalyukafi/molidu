import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
const UploadIcon = props => (
  <Icon {...props} style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
);

const UploadTugas = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fotoForm}>
        <Icon style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
        <Text>Masukkan File Anda</Text>
      </TouchableOpacity>
      {/* <Image
        source={require('../../../../assets/images/dashboard-image.png')}
        style={styles.image}
      /> */}
      <Button style={styles.submitBottom}>Kumpulkan</Button>
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
    borderRadius: 150,
    marginBottom: 20,
    justifyContent: 'center',
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
    marginBottom: 10,
  },
});

export default UploadTugas;
