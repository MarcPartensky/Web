import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export class FilmDetail extends React.Component {
    rendre() {
        return (
            <View style={styles.main_container}>
                <Text>Détail du film</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})
