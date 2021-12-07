import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Loading from '../../../../../components/Loading';
import firestore from '@react-native-firebase/firestore';
import { Input, Button, Icon, List, ListItem } from '@ui-kitten/components';

const ListBook = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const list = [];
        await firestore()
          .collection('books')
          .orderBy('createdAt', 'desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const {name, description, imageBook, pdfBook} = doc.data();
              list.push({
                id: doc.id,
                name,
                description,
                imageBook,
                pdfBook,
              });
            });
          });
        setBooks(list);
        if (loading) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);
 
  if (loading) {
    return <Loading />;
  }


  const renderItem = ({ item }) => (
    // <Button appearance="ghost"  >
      <ListItem
        key={`${item.id}`}
        title={`${item.name}`}
        description={`${item.description}`}
        accessoryLeft={() => (
          <Image
            source={{uri: item.imageBook[0]}}
            style={styles.image}
          />
        )
        }
        style={styles.list}
        onPress={() => navigation.navigate('DetailBook', {dataBook: {...item}})}
      />
    // </Button>
  );

  return (
    <View style={styles.container}>
       <List
          data={books}
          renderItem={renderItem}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 30
  }
});


export default ListBook;