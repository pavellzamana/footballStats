import React, {useEffect, useState} from 'react';
import Match from "../match/Match";
import {getMatches} from "../../api/Api";
import {IMatches} from "../common/types/Type";
import { DatePicker, Button, Layout } from 'antd';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {leagueType} from "../../redux/leagueReducer";
import {getFullResults, getResults, setSort} from "../../redux/actions";

import 'antd/dist/antd.css';
import styles from './Results.module.css';

const { RangePicker } = DatePicker;
const { Header } = Layout;

const Results: React.FC<leagueType> = () => {
    const [sortASC, setSortASC] = useState<boolean>(true);
    const dispatch = useDispatch();
    const match = useSelector((state: AppStateType) => state.results.sortedMatches)
    const leagueID = useSelector<AppStateType, number>((state) => state.league.leagueID);
    const resultsList = useSelector<AppStateType, IMatches[]>((state: AppStateType) => state.results.matches);

    const sortByDate = (sortField: string, sortType: boolean) => {
        setSortASC(sortType);
        dispatch(setSort(resultsList.sort((a: IMatches, b: IMatches) => sortType ? a[sortField] - b[sortField]
            : b[sortField] - a[sortField])))
    }

    const dateFilter = (date: any, dateString: [string, string]) => {
        const allMatchesDeepCopy: Array<IMatches> = JSON.parse(JSON.stringify(resultsList))
        dispatch(setSort(date ? allMatchesDeepCopy.filter(val => {
            return val.event_timestamp > Number(moment(dateString[0]).format('X'))
                && val.event_timestamp < Number(moment(dateString[1]).add(1, 'days').format('X'))
        }) : resultsList))
    }

    if (resultsList.length === 0) {
        getMatches(leagueID).then(result => {
            dispatch(getResults(result));
        })
    } else {
        dispatch(setSort(resultsList))
    }

    return (
        <div>
            <Header className={styles.header}>
            <RangePicker
                className={styles.calendar}
                onChange={(date, dateString) => {
                    dateFilter(date, dateString)
                }}
                format={"MM-DD-YYYY"}
            />

            <Button className={styles.menu} onClick={() => sortByDate('event_timestamp', !sortASC)}>Sort by
                Date: {sortASC ? '\u2193' : '\u2191'}</Button>
            </Header>
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
                            fixtureID={item.fixture_id}
                            key={i}/>)
                )}
            </div>
        </div>
    );
}


export default Results;


