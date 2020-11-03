import React from 'react';
import Results from "./Results";
import {matchesApi} from "../Api/Api";

class ResultsContainer extends React.Component {
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
        console.log('rendered')
        return (
            <Results state={this.state} />
        )
    }
}

export default ResultsContainer