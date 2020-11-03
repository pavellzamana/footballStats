import React from 'react';
import Results from "./Results";
import {matchesApi} from "../Api/Api";

class FetchDataForResults extends React.Component {
    constructor(props) {
        super(props);
        this.matches = []
        this.state = {
            matches: []
        }
        this.getMatches = matchesApi.getMatches

    }

    componentDidMount() {
        this.getMatches()
    }

    render() {
        return (
            <Results matchInfo={this.state} />
        )
    }
}

export default FetchDataForResults