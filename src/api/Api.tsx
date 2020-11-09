import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "ea02a01de2mshe8aef326aecd87dp18b8c1jsnbce3d7a33b01"
    },
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2/'

})


export const getMatches = () => {
    return instance.get(`fixtures/league/2790`).then(
        result => {
            return result.data.api.fixtures
        }
    )
}