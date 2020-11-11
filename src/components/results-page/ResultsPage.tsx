import { TreeSelect } from 'antd';
import React, {useEffect, useState} from "react";
import Results from "../results/Results";
import style from './ResultsPage.module.css'
import {getSeasons} from "../../api/Api";
import {ISeasons} from "../common/types/Type";

const { TreeNode } = TreeSelect;

const TreeSelector: React.FC = () => {
    const [id, setId] = useState<number>(2790)
    const [seasons, setSeasons] = useState<ISeasons[]>([])
    useEffect(() => {
        getSeasons().then(response => {
            setSeasons(response.filter((item: ISeasons) => {
                return (item.season > 2015 && ((item.country === 'England' && item.name === 'Premier League') ||
                                               (item.country === 'Italy' && item.name === 'Serie A')||
                                               (item.country === 'Spain' && item.name === 'Primera Division')))
            }))
        })
    }, [id])
    const changeID = (value: number) => {
        setId(value)
    }

    return (
        <div className={style.main}>
            <TreeSelect
                showSearch
                className={style.selector}
                value={id}
                treeDefaultExpandAll
                onChange={changeID}
            >
                <TreeNode value="parent 1-0" title="English Premier League" disabled>
                    {seasons.filter(item => item.country === 'England')
                        .sort((a, b) => (a.season > b.season) ? 1 : -1)
                        .map((item: ISeasons) =>
                        <TreeNode value={item.league_id}
                                  title={`country: ${item.country} season ${item.season} - ${item.season + 1}`}/>
                    )}
                </TreeNode>
                <TreeNode value="parent 1-1" title="Italian Serie A" disabled>
                    {seasons.filter(item => item.country === 'Italy')
                        .sort((a, b) => (a.season > b.season) ? 1 : -1)
                        .map((item: ISeasons) =>
                        <TreeNode value={item.league_id}
                                  title={`country: ${item.country} season ${item.season} - ${item.season + 1}`}/>
                    )}
                </TreeNode>
                <TreeNode value="parent 1-2" title="Spanish Primera" disabled>
                    {seasons.filter(item => item.country === 'Spain')
                        .sort((a, b) => (a.season > b.season) ? 1 : -1)
                        .map((item: ISeasons) =>
                        <TreeNode value={item.league_id}
                                  title={`country: ${item.country} season ${item.season} - ${item.season + 1}`}/>
                    )}
                </TreeNode>
            </TreeSelect>
            <Results leagueID={id}/>
        </div>
    );

}
export default TreeSelector