import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";
import { Menu, Dropdown } from 'antd';

import 'antd/dist/antd.css';
import styles from './Results.module.css'

interface LeagueProps {
    leagueID: number
}

const Results: React.FC<LeagueProps> = ({leagueID}) => {
    const [match, setMatch] = useState<IMatches[]>([])
    const [sort, setSort] = useState<string>('Sort by date')

    const sortByDateAsc = () => {
        setSort('Sort by date: Ascended')
        setMatch(match.sort((a, b) => (a.event_timestamp > b.event_timestamp) ? -1 : 1))
    }
    const sortByDateDesc = () => {
        setSort('Sort by date: Descended')
        setMatch(match.sort((a, b) => (a.event_timestamp < b.event_timestamp) ? -1 : 1))
    }

    useEffect(() => {
        getMatches(leagueID).then(result => {
            setMatch(result)
        })
    }, [leagueID])


    return (
        <div>
          <Dropdown overlay={<Menu>
              <Menu.Item onClick={sortByDateDesc}>
                  Descending
              </Menu.Item>
              <Menu.Item onClick={sortByDateAsc}>
                  Ascending
              </Menu.Item>
          </Menu>}>
              <div className={styles.menu}>{sort}</div>
            </Dropdown>

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



