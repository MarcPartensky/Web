import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: "image"}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_txt}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
                        {/* La propriété numberOfLines permet de couper un texte si celui-ci est très ... */}
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
