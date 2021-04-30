import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';
import {GiftedChat} from 'react-native-gifted-chat';

const MateriChatGuru = () => {
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Guru memberikan materi di sini!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Yukafi',
      },
      isTyping: true,
    },
  ]);
  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }
  return (
    <View style={styles.wrapper}>
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{_id: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default MateriChatGuru;
