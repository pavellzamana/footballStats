import {Layout, TreeSelect} from 'antd';
import React, {useEffect} from "react";
import Results from "../results/Results";
import {ICountry, ISeasons} from "../common/types/Type";
import {getCountriesList, getSeasonsList, setLeagueID} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {leagueType} from "../../redux/leagueReducer";

import style from './ResultsPage.module.css';

const { TreeNode } = TreeSelect;
const { Header } = Layout;

const TreeSelector: React.FC<leagueType> = () => {
    const dispatch = useDispatch();
    const countiesList = useSelector<AppStateType, ICountry[]>((state: AppStateType) => state.league.countries);
    const leagueID = useSelector<AppStateType, number>((state) => state.league.leagueID);
    const seasons = useSelector<AppStateType, ISeasons[]>((state: AppStateType) => state.league.seasons);

    useEffect(() => {
        dispatch(getCountriesList());
        dispatch(getSeasonsList(leagueID));
    }, [leagueID]);

    const changeID = (value: number) => {
        dispatch(setLeagueID(value));
    }

    return (
        <div>
            <Header className={style.header}>
                <div className={style.main}>
                    <TreeSelect
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
                                              title={`${item.country}: ${item.name}`}/>
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
                                .sort((a: ISeasons, b: ISeasons) => (a.season > b.season) ? 1 : -1)
                                .map((item: ISeasons) =>
                                    <TreeNode value={item.league_id}
                                              title={`season ${item.season} - ${item.season + 1}`}/>
                                )}
                        </TreeNode>
                    </TreeSelect>
                </div>
            </Header>
            <Results />
        </div>
    );

}

export default TreeSelector;
