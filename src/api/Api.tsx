import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "ea02a01de2mshe8aef326aecd87dp18b8c1jsnbce3d7a33b01"
    },
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2/'

})


export const getMatches = (league: number = 2790) => {
    return instance.get(`fixtures/league/${league}`).then(
        result => result.data.api.fixtures
    )
}


export const getSeasons = () => {
    return instance.get(`leagues/`).then(
        result => result.data.api.leagues
    )
}