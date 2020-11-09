import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import Preloader from "../common/preloader/preloader";
import {IMatches} from "../common/types/type";
import styles from './Results.module.css'
import 'antd/dist/antd.css';
import {getMatches} from "../../Api/Api";


const Results: React.FC = () => {

    const [match, setMatch] = useState([])
    getMatches(match)
    // useEffect(() => {
    //     getMatches(match)
    //         .then(
    //         () => {match.map((item:IMatches, i:number) =>
    //             <Match referee={item.referee}
    //                    homeTeam={item.homeTeam.team_name}
    //                    homeTeamLogo={item.homeTeam.logo}
    //                    goalsHome={item.goalsHomeTeam}
    //                    awayTeam={item.awayTeam.team_name}
    //                    awayTeamLogo={item.awayTeam.logo}
    //                    goalsAway={item.goalsAwayTeam}
    //                    date={item.event_timestamp}
    //                    round={item.round}
    //                    isPostponed={item.firstHalfStart}
    //                    key={i}/>)}
    //     )
    //
    //     console.log('USEEFFECT')
    // }, [match])


    return (
        <div>
            <button>RUN</button>
            <div className={styles.item}>
                {match.length ? match : <Preloader />}
            </div>
        </div>

    )
}
export default Results



