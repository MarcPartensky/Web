import React from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'

export default class Search extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundcolor: 'yellow' }}>
                <TextInput style={styles.textinput} placeholder="Titre du film"/>
                <Button style={{height: 50}} title="Rechercher" onPress={() => {}}/>
                <View style={{ height: 335, backgroundColor: 'green' }}></View>
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
