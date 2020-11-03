import React from 'react'
import style from './Match.module.css'
import { Space, Card } from 'antd';

const Match = (props) => {
    let date = (new Date(props.date*1000)).toISOString()
    .replace(/^([^T]+)T(.+)$/,'$1')
    const round = props.round.replace(`Regular Season -`, `Date: ${date} Matchday:`)
    return(
        <Space direction="vertical">
            <Card title={round} className={style.item} hoverable>
                {(!props.isPostponed && props.date*1000 < Date.now()) && <p><b>Match Postponed</b></p>}
                <p><img src={props.homeTeamLogo} alt={'teamLogo'} className={style.teamLogo}/>
                    {props.homeTeam} <span className={style.score}>{props.goalsHome}</span></p>
                <p><img src={props.awayTeamLogo} alt={'teamLogo'} className={style.teamLogo} />
                    {props.awayTeam} <span className={style.score}>{props.goalsAway}</span></p>
            </Card>
        </Space>
    )
}


export default Match