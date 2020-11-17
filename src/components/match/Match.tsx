import React from 'react'
import { Space, Card } from 'antd';
import moment, {Moment} from "moment";

import style from './Match.module.css'

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
    key: number
}


const Match: React.FC<MatchProps> = (props) => {
    const {
        homeTeam, homeTeamLogo,
        goalsAway, goalsHome,
        awayTeam, awayTeamLogo,
        date, round, isPostponed
    } = props,
        dateEvent: Moment = moment.unix(date),
        roundNo: string = round.replace(`Regular Season -`,
        `Date: ${dateEvent.format("MMM Do YYYY")} Matchday:`)
    return(
        <Space direction="vertical">
            <Card title={roundNo} className={style.item} hoverable>
                <div className={style.container}>
                    {(!isPostponed && dateEvent < moment()) && <p className={style.postpone }><b>Match Postponed</b></p>}
                    <p><img src={homeTeamLogo} alt={'teamLogo'} className={style.team_logo}/>
                        {homeTeam} <span className={style.score}>{goalsHome}</span></p>
                    <p><img src={awayTeamLogo} alt={'teamLogo'} className={style.team_logo} />
                        {awayTeam} <span className={style.score}>{goalsAway}</span></p>
                </div>
            </Card>
        </Space>
    )
}


export default Match