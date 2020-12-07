import {Layout, TreeSelect} from 'antd';
import React, {useEffect, useState} from "react";
import Results from "../results/Results";
import {getCountries, getSeasons} from "../../api/Api";
import {ICountry, ISeasons} from "../common/types/Type";
import {setLeagueID} from "../../redux/actions";
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {leagueType} from "../../redux/leagueReducer";

import style from './ResultsPage.module.css'

const { TreeNode } = TreeSelect;
const { Header } = Layout;

const TreeSelector: React.FC<leagueType> = ({leagueID}) => {
    const [seasons, setSeasons] = useState<ISeasons[]>([]);
    const [country, setCountry] = useState<ICountry[]>([]);
    const dispatch = useDispatch()

    useEffect(() => {
        getSeasons(leagueID).then(response => {
            setSeasons(response.filter((item: ISeasons) => {
                return item.season > 2015
            }));
        });
    }, [leagueID]);

    useEffect(() => {
        getCountries().then(response => {
            setCountry(response.filter((item: ICountry) => {
                return item.type === 'League'
            }));
        });
    }, [leagueID]);

    const changeID = (value: number) => {
        dispatch(setLeagueID(value))
    }

    return (
        <div>
            <Header className={style.header}>
                <div className={style.main}>
                    <TreeSelect
                        className={style.selector}
                        value={leagueID}
                        treeDefaultExpandAll
                        onChange={changeID}
                    >
                        <TreeNode value="parent 1-0" title="Countries and Leagues Available" disabled>
                            {country
                                .sort((a, b) => (a.country > b.country) ? 1 : -1)
                                .map((item: ICountry) =>
                                    <TreeNode value={item.league_id}
                                              title={`${item.country}: ${item.name}`}/>
                                )}
                        </TreeNode>
                    </TreeSelect>

                    <TreeSelect
                        className={style.selector}
                        value={leagueID}
                        treeDefaultExpandAll
                        onChange={changeID}
                    >
                        <TreeNode value="parent 1-0" title="Seasons Available" disabled>
                            {seasons
                                .sort((a, b) => (a.season > b.season) ? 1 : -1)
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

const mapStateToProps = (state: AppStateType) => {
    return {
        leagueID: state.league.leagueID
    }
}

export default connect(mapStateToProps, null)(TreeSelector);
