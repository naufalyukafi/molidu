import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import { Text } from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/id'

const DetailResume = ({route }) => {
    const {name, photoResume, titleBook, assigmentTime} = route.params.dataBook
    return (
        <View style={styles.container}>
            <View style={styles.wrapperCard}>
                <View>
                        <Image
                            source={{
                            uri: `https://randomuser.me/api/portraits/lego/${
                                Math.floor(Math.random() * 9) + 1
                            }.jpg`,
                            }}
                            style={styles.iconImage}
                        />
                </View>
                <View>
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text>{moment(assigmentTime.toDate()).locale('id').format('LLLL') || ''}</Text>
                </View>
            </View>
            <Text style={styles.judul}>Judul Buku: {titleBook}</Text>
            {
                photoResume.map(item => (
                    <Image
                        key={Math.random() + 1}
                        source={{uri: item}}
                        style={styles.image}
                    />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  content: {
    padding: 15
  },
  title: {
    fontWeight: 'bold'
  },
  image: {
      width: '100%',
      height: 250,
      marginTop: 20
  },
  iconImage: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  card: {
    marginBottom: 10
  },
  wrapperCard: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  judul: {
      fontWeight: 'bold',
      marginTop: 20
  }
});


export default DetailResume;