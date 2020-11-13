import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";
import { Menu, Dropdown } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './Results.module.css'

interface LeagueProps {
    leagueID: number
}

const Results: React.FC<LeagueProps> = ({leagueID}) => {
    const [match, setMatch] = useState<IMatches[]>([])
    const [count, setCount] = useState<string>('')

    const inc = () => {
        setCount('ascended')
        setMatch(match.sort((a, b) => (a.event_timestamp > b.event_timestamp) ? -1 : 1))
    }
    const dec = () => {
        setCount('descended')
        setMatch(match.sort((a, b) => (a.event_timestamp < b.event_timestamp) ? -1 : 1))
    }

    useEffect(() => {
        getMatches(leagueID).then(result => {
            setMatch(result)
        })
    }, [leagueID])

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
          <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Hover me <DownOutlined />
                </a>
            </Dropdown>

            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>

            <div className={styles.item}>
                {match.map(
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
                )}
            </div>
        </div>
    )
}
export default Results



