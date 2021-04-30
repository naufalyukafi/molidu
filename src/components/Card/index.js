import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text, Icon} from '@ui-kitten/components';
const Card = props => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cardTitle}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{props.name}</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/dashboard-image.png')}
          style={styles.image}
        />
        <View style={styles.contentDesc}>
          <Text>Nama: {props.name}</Text>
          <Text>Status: {props.status}</Text>
        </View>
      </View>
      <View style={{height: 3, backgroundColor: 'gray', marginTop: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardTitle: {
    height: 50,
    backgroundColor: '#1890FF',
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 15,
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    height: 150,
    width: 150,
  },
  contentDesc: {
    paddingLeft: 5,
    justifyContent: 'center',
  },
});

export default Card;
