import React from 'react';
import Results from "./Results";
import axios from "axios";
import {matchesApi} from "../Api/Api";



class FetchDataForResults extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            matches: []
        }
    }

    componentDidMount() {
        const instance = axios.create ({
            headers: {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "ea02a01de2mshe8aef326aecd87dp18b8c1jsnbce3d7a33b01"
            },
            baseURL: 'https://api-football-v1.p.rapidapi.com/v2/'

        })
        instance.get(`fixtures/league/2790`).then(responce => {
            this.setState({matches: responce.data.api.fixtures})
        })
        // debugger
        // matchesApi.getMatches(this.setState.bind(this.setState))
    }

    render() {
        return (
            <Results matchInfo={this.state} />
        )
    }
}

export default FetchDataForResults