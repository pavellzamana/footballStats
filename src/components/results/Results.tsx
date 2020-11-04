import React from 'react';
import 'antd/dist/antd.css';
import Match from "../match/Match";
import Preloader from "../../common/preloader/preloader";
import styles from './Results.module.css'
import {IMatches} from "../../common/types/type";


const Results = (props: any) => {
    let resultList;
    resultList = props.matchInfo.matches.map((item:IMatches, i:number) =>
        <Match referee={item.referee}
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
    return (
        <div className={styles.item}>
            {resultList.length ? resultList : <Preloader />}
        </div>
    )
}
export default Results



