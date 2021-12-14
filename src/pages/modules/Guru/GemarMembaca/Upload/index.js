import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Input, Button, Icon } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

const UploadBookTeacher = ({navigation}) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageBook, setImageBook] = useState('')
  const [pdfBook, setPdfBook] = useState([])
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

  const takePdfFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })
      setPdfBook(res[0].uri)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Anda batal ambil buku')
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  const takePhotoFromGalery = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      setImageBook(images.map(item => item.path));
    });
  }

  const onSubmitBook = async () => {
      await firestore()
        .collection('books')
        .add({
          name: name,
          description: description,
          imageBook: imageBook,
          pdfBook: pdfBook,
          createdAt: new Date().getTime(),
        })
        navigation.navigate('ListBookTeacher');
        // .then(() => {
        //   Alert('Sukes Tambah Buku', 'Anda telah berhasil menambahkan buku')
          
        // }).catch((err) => {
        //   Alert('Error', 'Error: ', err)
        // })
  };
  
  return (
    <View style={styles.container}>
       <View style={styles.inputContainer}>
        <Input
          value={name}
          label="Name"
          placeholder="Masukkan nama buku"
          onChangeText={nextValue => setName(nextValue)}
          style={styles.input}
        />
        <Input
          value={description}
          label="Description"
          placeholder="Masukkan deskripsi buku"
          onChangeText={nextValue => setDescription(nextValue)}
          style={styles.input}
        />
        
        {
         imageBook === "" ? 
          <TouchableOpacity style={styles.fotoForm} onPress={takePhotoFromGalery}>   
            <Icon style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
            <Text>Foto Cover Buku</Text>
          </TouchableOpacity> 
          :
          <>
            <Text style={styles.label}>Foto Buku</Text>
            <Image
                source={{uri: `${imageBook}`}}
                style={styles.file}
              />
           
          </>
        }

        {
          pdfBook.length === 0 ? 
          <TouchableOpacity style={styles.fotoForm} onPress={takePdfFile}>
            <Icon style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
            <Text>File Buku (.pdf)</Text>
          </TouchableOpacity> : 
          <>
            <Text style={styles.pdf}>*Anda telah memilih buku, silahkan klik button di bawah!.</Text>
          </>
        }
        {((name != "") && (description != "") && (imageBook != "") && (pdfBook != "")) ?
        <Button onPress={() => onSubmitBook()}>Tambah Buku</Button> : 
        <Button disabled>Tambah Buku</Button> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  wrapperMenus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  box: {
    width: '44%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
    paddingBottom: 10
  },
  wraperBook: {
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
  
  inputContainer: {
    marginTop: 50
  },
  input: {
    width: '90%',
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  label: {
    color: 'grey',
    marginBottom: 10
  },
  pdf: {
    color: 'grey',
    marginBottom: 10,
    marginTop: 10
  },
  fotoForm: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    // borderRadius: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10
  },

  submitBottom: {
    width: '100%',
    marginTop: 20,
  },

  icon: {
    width: 80,
    height: 80,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  file: {
    width: '100%',
    height: 180
  },

});


export default UploadBookTeacher;