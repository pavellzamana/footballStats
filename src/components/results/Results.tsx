import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";

import 'antd/dist/antd.css';
import styles from './Results.module.css'

const Results: React.FC = () => {
    const [match, setMatch] = useState([])
    useEffect(() => {
        getMatches()
            .then(
                result => {
                    let state = result.data.api.fixtures.map(
                        ((item: IMatches, i: number) =>
                            <Match
                                homeTeam={item.homeTeam.team_name}
                                homeTeamLogo={item.homeTeam.logo}
                                goalsHome={item.goalsHomeTeam}
                                awayTeam={item.awayTeam.team_name}
                                awayTeamLogo={item.awayTeam.logo}
                                goalsAway={item.goalsAwayTeam}
                                date={item.event_timestamp}
                                round={item.round}
                                isPostponed={item.firstHalfStart}
                                key={i}/>)
                    )
                    setMatch(state)
                })
    }, [])

    return (
        <div>
            <button>RUN</button>
            <div className={styles.item}>
                {match}
            </div>
        </div>
    )
}
export default Results



