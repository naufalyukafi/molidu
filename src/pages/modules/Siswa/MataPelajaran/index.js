import React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {CardMapelScreen} from '../../../../components';
const MataPelajaran = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailMataPelajaran')}>
        <CardMapelScreen lessonName="Tematik" bgLesson="#1890FF" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailMataPelajaran')}>
        <CardMapelScreen
          lessonName="Bahasa Inggris"
          bgLesson="#CCE918"
          route="DetailMataPelajaran"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailMataPelajaran')}>
        <CardMapelScreen
          lessonName="Agama Islam"
          bgLesson="#1DDC30"
          route="DetailMataPelajaran"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
});

export default MataPelajaran;
