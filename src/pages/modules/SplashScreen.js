import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StackActions } from '@react-navigation/native'

const SplashScreen = ({navigation}) => {

  useEffect(() => {
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('IntroScreen'));
      }, 3000)
  }, [])

  return (
    <View style={styles.wrapper}>
        <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1890FF',
    justifyContent: 'center',
    padding: 20,
    padding: 20
  },
  image: {
      width: '100%',
  }
});

export default SplashScreen;
