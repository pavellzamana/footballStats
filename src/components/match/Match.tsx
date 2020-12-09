import React from 'react'
import { Space, Card } from 'antd';
import moment, {Moment} from "moment";
import {NavLink} from 'react-router-dom'
import {useDispatch} from "react-redux";

import style from './Match.module.css'
import {setFixtureData} from "../../redux/actions";

type MatchProps = {
    homeTeam: string
    homeTeamLogo: string
    goalsHome: number
    awayTeam: string
    goalsAway: number
    awayTeamLogo: string
    date: number
    round: string
    isPostponed: number | null
    fixtureID: number
    key: number
}


const Match: React.FC<MatchProps> = (props) => {
    const {
        homeTeam, homeTeamLogo,
        goalsAway, goalsHome,
        awayTeam, awayTeamLogo,
        date, round, isPostponed, fixtureID
    } = props,
        dateEvent: Moment = moment.unix(date),
        dateString: string = dateEvent.format("MMM Do YYYY"),
        roundNo: string = round.replace(`Regular Season -`,
        `Date: ${dateString} Matchday:`);
    const dispatch = useDispatch()

    return(
        <Space direction="vertical">
            <NavLink to={'/details/' + fixtureID}>
                <Card title={roundNo} className={style.item} hoverable onClick={() => dispatch(setFixtureData(fixtureID, dateString))}>
                    <div className={style.container}>
                        {(!isPostponed && dateEvent < moment()) && <p className={style.postpone }><b>Match Postponed</b></p>}
                        <p><img src={homeTeamLogo} alt={'teamLogo'} className={style.team_logo}/>
                            {homeTeam} <span className={style.score}>{goalsHome}</span></p>
                        <p><img src={awayTeamLogo} alt={'teamLogo'} className={style.team_logo} />
                            {awayTeam} <span className={style.score}>{goalsAway}</span></p>
                    </div>
                </Card>
            </NavLink>
        </Space>
    )
}


export default Match;