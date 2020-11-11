import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import{ getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false,
            searchedText: ""
        }
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.state.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.state.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results),
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.setState({ searchedText: text })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            console.log("Page: " + this.page+" / TotalPages : " + this.totalPages +
                " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
    }


    render() {
        return (
          <View style={styles.main_container}>
            <TextInput
              style={styles.textinput}
              placeholder='Titre du film'
              onChangeText={(text) => this._searchTextInputChanged(text)}
              onSubmitEditing={() => this._searchFilms()}
            />
              <Button title='Rechercher' onPress={() => this._searchFilms()}/>
            {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
            <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.page < this.totalPages) {
                        this._loadFilms()
                    }
                }}
                renderItem={({item}) => <FilmItem film={item}/>}
            />
            {this._displayLoading()}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
