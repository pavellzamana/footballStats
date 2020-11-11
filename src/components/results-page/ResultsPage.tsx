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
        getSeasons(id).then(response => {
            setSeasons(response.filter((item: ISeasons) => {
                return item.season > 2015
            }))
        })
    }, [])
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
                    <TreeNode value="parent 1-0" title="English Premier League" disabled >
                        {seasons.map((item: ISeasons, i) => <TreeNode value={item.league_id}
                                                                      title={`season ${item.season} - ${item.season+1}`} />
                        )}
                    </TreeNode>
                </TreeSelect>
                <Results leagueID={id}/>
            </div>
        );

}
export default TreeSelector