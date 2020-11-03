import React from 'react';
import 'antd/dist/antd.css';
import Match from "../match/Match";
import Preloader from "../../common/preloader/preloader";
import styles from './Results.module.css'


let Results = (props) => {
    console.log(props.state)
    let resultList;
    resultList = props.state.matches.map((item, i) =>
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
            {resultList.length === 0 ? <Preloader /> : resultList}
        </div>
    )
}
export default Results



