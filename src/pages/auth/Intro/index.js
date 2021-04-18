import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text, Icon} from '@ui-kitten/components';
const Intro = ({navigation}) => {
  const FacebookIcon = props => <Icon name="facebook" {...props} />;
  const GoogleIcon = props => <Icon name="google" {...props} />;

  return (
    <View style={styles.wrapper}>
      <Text
        style={{
          textAlign: 'center',
          color: '#E5E1E1',
          fontWeight: 'bold',
          fontSize: 25,
          marginBottom: 10,
        }}>
        Molidu Education
      </Text>
      <Image
        source={require('../../../assets/images/icon-image.png')}
        style={styles.image}
      />

      <View style={styles.bottom}>
        <Button onPress={() => navigation.navigate('LoginScreen')}>
          Masuk
        </Button>
        <Text style={styles.textOr}>Atau</Text>
        <Button onPress={() => navigation.navigate('SignupScreen')}>
          Daftar
        </Button>
        <View style={styles.btnLoginSocial}>
          <Button style={styles.btnFacebook} accessoryLeft={FacebookIcon}>
            Facebook
          </Button>
          <Button style={styles.btnGoogle} accessoryLeft={GoogleIcon}>
            Google
          </Button>
        </View>
        <Text style={styles.textPriv}>
          Dengan masuk atau mendaftar, Anda menyetujui
          <Text style={styles.span}> Ketentuan Layanan</Text> dan{' '}
          <Text style={styles.span}>Kebijakan Privasi</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1890FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  image: {
    width: 300,
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
  },
  textOr: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  btnLoginSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btnFacebook: {
    width: '48%',
    marginRight: 18,
  },
  btnGoogle: {
    width: '48%',
    backgroundColor: '#4367B2',
  },
  span: {
    color: '#41A4FF',
    fontWeight: 'bold',
  },
});

export default Intro;
