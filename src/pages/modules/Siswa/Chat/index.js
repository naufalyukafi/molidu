import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider, List, ListItem, Button} from '@ui-kitten/components';

const ChatSiswa = ({navigation}) => {
  const [data, setData] = React.useState([
    {
      title: 'Tematik',
      description: 'Tematik asikkk...',
    },
    {
      title: 'Bahasa Inggris',
      description: 'Bahasa Inggris asikkk...',
    },
    {
      title: 'Agama Islam',
      description: 'Agama Islam asikkk...',
    },
  ]);

  return (
    <View style={styles.wrapper}>
      <ListItem
        onPress={() => navigation.navigate('Room')}
        title="Chat 1"
        description="Deskripsi di sini"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default ChatSiswa;
