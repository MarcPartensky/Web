import React from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'

export default class Search extends React.Component {
    _loadFilms() {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundcolor: 'yellow', flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: 'red' }}></View>
                <View style={{ flex: 2, backgroundColor: 'green' }}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})
