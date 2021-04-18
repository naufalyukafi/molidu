import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Text, Icon } from '@ui-kitten/components'
const Loading = () => {
    return (
        <View style={styles.wrapper}>
            <Text>Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1890FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Loading
