import React from 'react'
import style from './Match.module.css'
import { Space, Card } from 'antd';

const Match = (props) => {
    let date = (new Date(props.date*1000)).toISOString()
    .replace(/^([^T]+)T(.+)$/,'$1')
    const round = props.round.replace(`Regular Season -`, `Date: ${date} Matchday:`)
    return(
        <Space direction="vertical">
            <Card title={round} className={style.item} hoverable={true}>
                {(!props.isPostponed && props.date*1000 < Date.now()) && <p><b>Match Postponed</b></p>}
                <p><img src={props.homeTeamLogo} alt={'teamlogo'} style={{height: '30px'} }/>
                    {props.homeTeam} <span className={style.score}>{props.goalsHome}</span></p>
                <p><img src={props.awayTeamLogo} alt={'teamlogo'} style={{height: '30px'}} />
                    {props.awayTeam} <span className={style.score}>{props.goalsAway}</span></p>
            </Card>
        </Space>



    )
}


export default Match