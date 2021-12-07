import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
const DetailBookTeacher = ({navigation,route }) => {
    const {name, description, pdfBook} = route.params.dataBook

    console.log(pdfBook)

    // RNFS.readFile(pdfBook, "base64").then(result => {
    //   console.log(result)
    // })
    return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text><Text style={styles.title}>Judul Buku:</Text> {name}</Text>
            <Text style={styles.title}>Descripsi: </Text>
            <Text>{description}</Text>
           </View> 
           {
             !pdfBook ? "" :
             <Pdf
              source={{ uri: pdfBook }}
              style={styles.pdf}
            />
          }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15
  },
  title: {
    fontWeight: 'bold'
  },
  pdf: { 
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    marginTop: 10
}
});


export default DetailBookTeacher;