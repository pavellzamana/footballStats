import axios, {AxiosInstance} from "axios";
import {IMatches} from "../components/common/types/type";

const instance: AxiosInstance = axios.create({
    headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "ea02a01de2mshe8aef326aecd87dp18b8c1jsnbce3d7a33b01"
    },
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2/'

})
export const getMatches: (state: Array<IMatches>) => Promise<void> = async (state) => {
    let response = await instance.get(`fixtures/league/2790`)
    state.push(response.data.api.fixtures)
    console.log(response.data.api)
}
