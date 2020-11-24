import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";
import { DatePicker, Button } from 'antd';
import moment from "moment";
import 'antd/dist/antd.css';
import styles from './Results.module.css'

interface LeagueProps {
    leagueID: number;
}

const { RangePicker } = DatePicker;

const Results: React.FC<LeagueProps> = ({leagueID}) => {
    const [match, setMatch] = useState<IMatches[]>([]);
    const [sortASC, setSortASC] = useState<boolean>(true);
    const [matchesFullList, setMatchesFullList] = useState<IMatches[]>([])

    const sortByDate = (sortField: string, sortType: boolean) => {
        setSortASC(sortType);
        setMatch(match.sort((a, b) => sortType ? a[sortField] - b[sortField]
                                                                 : b[sortField] - a[sortField]));
    }

    const dateFilter = (date: any, dateString: [string, string]) => {
        const allMatchesDeepCopy: Array<IMatches> = JSON.parse(JSON.stringify(matchesFullList))
        setMatch(date ? allMatchesDeepCopy.filter(val => {
            return val.event_timestamp > Number(moment(dateString[0]).format('X'))
                && val.event_timestamp < Number(moment(dateString[1]).add(1, 'days').format('X'))
        }) : matchesFullList);
    }

    useEffect(() => {
        getMatches(leagueID).then(result => {
            setMatch(result);
            setMatchesFullList(result);
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

            <Button className={styles.menu} onClick={() => sortByDate('event_timestamp', !sortASC)}>Sort by
                Date: {sortASC ? '\u2193' : '\u2191'}</Button>

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
