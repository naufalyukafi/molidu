import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@ui-kitten/components';
import {CardScreen} from '../../../../../components';

const TugasGuru = () => {
  return (
    <View style={styles.container}>
      <Text>Tanggal: 20 - 05 - 2021</Text>
      <View style={{height: 3, backgroundColor: 'gray', marginTop: 10}} />
      <ScrollView>
        <CardScreen name="Paijo Supratman" status="Hadir" />
        <CardScreen name="Sukiyem Leobi" status="Hadir" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default TugasGuru;
