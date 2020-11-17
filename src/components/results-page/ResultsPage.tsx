import { TreeSelect } from 'antd';
import React, {useEffect, useState} from "react";
import Results from "../results/Results";
import {getCountries, getSeasons} from "../../api/Api";
import {ICountry, ISeasons} from "../common/types/Type";

import style from './ResultsPage.module.css'

const { TreeNode } = TreeSelect;

const TreeSelector: React.FC = () => {
    const [id, setId] = useState<number>(2790);
    const [seasons, setSeasons] = useState<ISeasons[]>([]);
    const [country, setCountry] = useState<ICountry[]>([]);

    useEffect(() => {
        getSeasons(id).then(response => {
            setSeasons(response.filter((item: ISeasons) => {
                return item.season > 2015
            }));
        });
    }, [id])

    useEffect(() => {
        getCountries().then(response => {
            setCountry(response.filter((item: ICountry) => {
                return item.type === 'League'
            }));
        });
    }, [id]);

    const changeID = (value: number) => {
        setId(value);
    }

    return (
        <div className={style.main}>
            <TreeSelect
                className={style.selector}
                value={id}
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
                value={id}
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
            <Results leagueID={id}/>
        </div>
    );

}
export default TreeSelector;