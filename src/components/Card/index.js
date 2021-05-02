import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '@ui-kitten/components';
import moment from 'moment';
const Card = ({item}) => {
  return (
    <View style={styles.wrapper}>
      {moment().format('LL') ===
        moment(item.attendanceTime.toDate()).format('LL') && (
        <>
          <View style={styles.cardTitle}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {item.email}
            </Text>
          </View>
          <View style={styles.contentImage}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
          <View style={styles.contentDesc}>
            <Text>Nama: {item.email}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Waktu: {moment(item.attendanceTime.toDate()).fromNow()}</Text>
          </View>
          <View style={{height: 3, backgroundColor: 'gray', marginTop: 10}} />
        </>
      )}
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
  contentImage: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop: 10,
    height: 250,
    width: 250,
    // borderRadius: 250 / 2,
  },
  contentDesc: {
    paddingLeft: 5,
    justifyContent: 'center',
  },
});

export default Card;
