import React from 'react'
import { Space, Card } from 'antd';
import moment, {Moment} from "moment";

import style from './Match.module.css'

type MatchProps = {
    homeTeam: string
    homeTeamLogo: any
    goalsHome: number
    awayTeam: string
    goalsAway: number
    awayTeamLogo: any
    date: number
    round: string
    isPostponed: number | null
    key: number
}


const Match: React.FC<MatchProps> = (props) => {
    const date: Moment = moment.unix(props.date)
    const round: string = props.round.replace(`Regular Season -`,
        `Date: ${date.format("MMM Do YYYY")} Matchday:`)
    return(
        <Space direction="vertical">
            <Card title={round} className={style.item} hoverable>
                {(!props.isPostponed && date < moment()) && <p><b>Match Postponed</b></p>}
                <p><img src={props.homeTeamLogo} alt={'teamLogo'} className={style.team_logo}/>
                    {props.homeTeam} <span className={style.score}>{props.goalsHome}</span></p>
                <p><img src={props.awayTeamLogo} alt={'teamLogo'} className={style.team_logo} />
                    {props.awayTeam} <span className={style.score}>{props.goalsAway}</span></p>
            </Card>
        </Space>
    )
}


export default Match