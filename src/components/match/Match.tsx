import React from 'react'
import style from './Match.module.css'
import { Space, Card } from 'antd';

type MatchProps = {
    referee: string
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
    const dateToMilliSeconds: number = props.date*1000
    const date: string = (new Date(dateToMilliSeconds)).toISOString()
    .replace(/^([^T]+)T(.+)$/,'$1')
    const round: string = props.round.replace(`Regular Season -`, `Date: ${date} Matchday:`)
    return(
        <Space direction="vertical">
            <Card title={round} className={style.item} hoverable>
                {(!props.isPostponed && dateToMilliSeconds < Date.now()) && <p><b>Match Postponed</b></p>}
                <p><img src={props.homeTeamLogo} alt={'teamLogo'} className={style.teamLogo}/>
                    {props.homeTeam} <span className={style.score}>{props.goalsHome}</span></p>
                <p><img src={props.awayTeamLogo} alt={'teamLogo'} className={style.teamLogo} />
                    {props.awayTeam} <span className={style.score}>{props.goalsAway}</span></p>
            </Card>
        </Space>
    )
}


export default Match