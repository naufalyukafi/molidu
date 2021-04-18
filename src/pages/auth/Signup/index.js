import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Text, Icon, Input} from '@ui-kitten/components';

const Signup = () => {
  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#E5E1E1',
          fontWeight: 'bold',
          paddingTop: 50,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Molidu Education
      </Text>
      <Image
        source={require('../../../assets/images/login-icon.png')}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Input
          value={value}
          label="Nama"
          placeholder="Masukkan nama anda"
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.input}
        />
        <Input
          value={value}
          label="Email"
          placeholder="Masukkan email anda"
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.input}
        />
        <Input
          value={value}
          label="Password"
          placeholder="Masukkan password anda"
          caption="Minimal harus ada 6 huruf"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.input}
        />
        <Button>Masuk</Button>
        <TouchableOpacity>
          <Text> Have account? Login</Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  textForgot: {
    marginTop: 10,
  },
});

export default Signup;
