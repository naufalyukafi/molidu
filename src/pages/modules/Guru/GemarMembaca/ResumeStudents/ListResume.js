import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider, List, ListItem, Button, Card, Text} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../../../components/Loading';
import moment from 'moment';
import 'moment/locale/id';

const ListResume = ({navigation}) => {
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Resume')
      .onSnapshot(querySnapshot => {
        const resume = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            photoResume: '',
            titleBook: '',
            ...documentSnapshot.data(),
          };
        });

        setResume(resume);

        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  const renderItem = (item) => {
    return (
        <Card style={styles.card} onPress={() => navigation.navigate('DetailResume', {dataBook: item.item})}>
            <View style={styles.wrapperCard}>
                <View style={styles.wrapper__student}>
                        <Image
                            source={{
                            uri: `https://randomuser.me/api/portraits/lego/${
                                Math.floor(Math.random() * 9) + 1
                            }.jpg`,
                            }}
                            style={styles.image}
                        />
                </View>
                <View>
                    <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
                    <Text>{moment(item.item.assigmentTime.toDate()).locale('id').format('L') || ''}</Text>
                    <Text>{item.item.titleBook || ""}</Text>
                </View>
            </View>
        </Card>
  )};

  return (
    <>
      <View style={styles.wrapper}>
        <FlatList
          data={resume}
          renderItem={(item) => renderItem(item)}
          keyExtractor={item => item._id}
          style={{marginBottom: 20}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10
  },
  image: {
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
  }
});

export default ListResume;
