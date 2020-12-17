import {Button, DatePicker, Layout, TreeSelect} from 'antd';
import React, {useEffect, useState} from "react";
import {ICountry, IMatches, ISeasons} from "../common/types/Type";
import {getCountriesList, getFullResults, getResults, getSeasonsList, setLeagueID, setSort} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {leagueType} from "../../redux/leagueReducer";
import Match from "../match/Match";
import moment from "moment";
import {getMatches} from "../../api/Api";

import style from './ResultsPage.module.css';

const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const { Header } = Layout;

const ResultsPage: React.FC<leagueType> = () => {
    const dispatch = useDispatch();
    const countiesList = useSelector<AppStateType, ICountry[]>((state: AppStateType) => state.league.countries);
    const leagueID = useSelector<AppStateType, number>((state) => state.league.leagueID);
    const seasons = useSelector<AppStateType, ISeasons[]>((state: AppStateType) => state.league.seasons);
    const match = useSelector((state: AppStateType) => state.results.sortedMatches)
    const [sortASC, setSortASC] = useState<boolean>(true);
    const resultsList = useSelector<AppStateType, IMatches[]>((state: AppStateType) => state.results.matches);

    const dateFilter = (date: any, dateString: [string, string]) => {
        const allMatchesDeepCopy: Array<IMatches> = JSON.parse(JSON.stringify(resultsList))
        dispatch(setSort(date ? allMatchesDeepCopy.filter(val => {
            return val.event_timestamp > Number(moment(dateString[0]).format('X'))
                && val.event_timestamp < Number(moment(dateString[1]).add(1, 'days').format('X'))
        }) : resultsList))
    }

    const sortByDate = (sortField: string, sortType: boolean) => {
        setSortASC(sortType);
        dispatch(setSort(match.sort((a: IMatches, b: IMatches) => sortType ? a[sortField] - b[sortField]
            : b[sortField] - a[sortField])))
    }

    useEffect(() => {
        if (countiesList.length === 0) {
            dispatch(getCountriesList());
        }
        dispatch(getSeasonsList(leagueID));
        getMatches(leagueID).then(result => {
            dispatch(getResults(result));
        });
    }, [leagueID]);

    const changeID = (value: number) => {
        dispatch(setLeagueID(value));
    }
    return (
        <div>
            <Header className={style.header}>
                <RangePicker
                    className={style.calendar}
                    onChange={(date, dateString) => {
                        dateFilter(date, dateString)
                    }}
                    format={"MM-DD-YYYY"}
                />
                <TreeSelect
                    showSearch
                    filterTreeNode={(search, item) => {
                        // @ts-ignore
                        return item.title!.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                    }}
                    className={style.selector}
                    placeholder='Countries and Leagues Available'
                    treeDefaultExpandAll
                    onChange={changeID}
                >
                    <TreeNode value="parent 1-0" title="Countries and Leagues Available" disabled>
                        {countiesList && countiesList
                            .sort((a: ICountry, b: ICountry) => (a.country > b.country) ? 1 : -1)
                            .map((item: ICountry) =>
                                <TreeNode value={item.league_id}
                                          title={item.country + ':' + item.name}/>
                            )}
                    </TreeNode>
                </TreeSelect>

                <TreeSelect
                    className={style.selector}
                    placeholder='Seasons Available'
                    treeDefaultExpandAll
                    onChange={changeID}
                >
                    <TreeNode value="parent 1-0" title="Seasons Available" disabled>
                        {seasons
                            .sort((a: ISeasons, b: ISeasons) => a.season - b.season)
                            .map((item: ISeasons) =>
                                <TreeNode value={item.league_id}
                                          title={'season ' + item.season + ' - ' + (item.season + 1)}/>
                            )}
                    </TreeNode>
                </TreeSelect>
                <Button className={style.order} onClick={() => sortByDate('event_timestamp', !sortASC)}>Sort by
                    Date: {sortASC ? '\u2193' : '\u2191'}</Button>
            </Header>
            <div className={style.item}>
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

export default ResultsPage;