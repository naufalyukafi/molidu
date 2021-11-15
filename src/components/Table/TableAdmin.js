import React from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { Icon, Button } from '@ui-kitten/components';

const TableAdmin = ({title, dataTable, onNewPage}) => {
    const StarIcon = (props) => (
      <Icon {...props} name='plus-circle' style={styles.icon} fill="#1890FF" />
    );

    return (
      <View style={styles.container}>
        <Table
            state={styles.tableStyle}
            borderStyle={{
              borderWidth: 1,
              alignItems: "center"
            }}
          >
            <Row
              data={title}
              style={styles.head}
              textStyle={[styles.text, styles.tableTitle]}
            />
            <Rows
              data={dataTable}
              textStyle={[styles.text, styles.tableData]}
            />
          </Table>    

            <Button
              style={styles.touchableOpacity}
              appearance='ghost'
              accessoryLeft={StarIcon}
              onPress={onNewPage}
            />
      </View>    
	  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  gridSystems: {
    flex: 1
  },
  tableStyle: {
    width: Dimensions.get("screen").width
  },
  head: {
    height: 45,
    backgroundColor: "#1890FF",
  },
  tableTitle: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center'
  },
  tableData: {
    height: "auto",
    paddingTop: 10,
    textAlign: 'center'
  },
  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  action: {
    flexDirection: 'row'
  },
  icon: {
    width: 50,
    height: 55,
  },
  iconAction: {
    width: 30,
    height: 30
  }
});

export default TableAdmin