import API_TOKEN from '../Helpers/token'
const API_TOKEN = "9bcddcc1dcaa971161ee8474d0034667"

export function getFilmsFromApiWithSearchedText(text) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr&query=" + text
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
