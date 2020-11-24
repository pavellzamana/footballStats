import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";
import { Menu, Dropdown, DatePicker } from 'antd';
import moment, {Moment} from "moment";

import 'antd/dist/antd.css';
import styles from './Results.module.css'

interface LeagueProps {
    leagueID: number;
}

const { RangePicker } = DatePicker;

const Results: React.FC<LeagueProps> = ({leagueID}) => {
    const [match, setMatch] = useState<IMatches[]>([]);
    const [sortASC, setSortASC] = useState<boolean>();
    const [fullList, setFullList] = useState<IMatches[]>([])

    const sortByDate = (sortField: string, sortType: boolean) => {
        setSortASC(sortType);
        setMatch(match.sort((a, b) => sortType ? a[sortField] - b[sortField]
                                                                 : b[sortField] - a[sortField]));
    }

    const dateFilter = (date: any, dateString: [string, string]) => {
        setMatch(date ? match.filter(val => {
            return val.event_timestamp > Number(moment(dateString[0]).format('X'))
                && val.event_timestamp < Number(moment(dateString[1]).format('X'))
        }) : fullList)
    }

    useEffect(() => {
        getMatches(leagueID).then(result => {
            setMatch(result);
            setFullList(result);
        })
    }, [leagueID]);

    return (
        <div>
            <RangePicker
                className={styles.calendar}
                onChange={(date, dateString) => {
                    dateFilter(date, dateString)
                }}
                format={"MM-DD-YYYY"}
            />

          <Dropdown overlay={<Menu>
              <Menu.Item onClick={() => sortByDate('event_timestamp', true)}>
                  Date {'\u2191'}
              </Menu.Item>
              <Menu.Item onClick={() => sortByDate('event_timestamp', false)}>
                  Date {'\u2193'}
              </Menu.Item>
          </Menu>}>
              <div className={styles.menu}>Sort by date:  {sortASC ? '\u2191' : '\u2193'}</div>
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
export default Results;
