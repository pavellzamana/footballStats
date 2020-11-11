import { TreeSelect } from 'antd';
import React from "react";
import Results from "../results/Results";
import style from './ResultsPage.module.css'

const { TreeNode } = TreeSelect;

export default class TreeSelector extends React.Component {
    state = {
        value: 2,
    };

    onChange = (value: number) => {
        this.setState({ value });
    };


    render() {
        return (
            <div className={style.main}>
                <TreeSelect
                    showSearch
                    className={style.selector}
                    value={this.state.value}
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                    <TreeNode value="parent 1-0" title="English Premier League" disabled>
                        <TreeNode value="2" title="season 2018-2019" />
                        <TreeNode value="524" title="season 2019-2020" />
                        <TreeNode value="2790" title="season 2020-2021" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="Italian Serie A" disabled>
                        <TreeNode value="94" title="season 2018-2019" />
                        <TreeNode value="891" title="season 2019-2020" />
                        <TreeNode value="2857" title="season 2020-2021" />
                    </TreeNode>
                    <TreeNode value="parent 1-2" title="Spanish Primera" disabled>
                        <TreeNode value="87" title="season 2018-2019" />
                        <TreeNode value="775" title="season 2019-2020" />
                        <TreeNode value="2833" title="season 2020-2021" />
                    </TreeNode>
                </TreeSelect>
                <Results leagueID={this.state.value}/>
            </div>
        );
    }
}