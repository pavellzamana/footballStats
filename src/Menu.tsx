import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";
import MatchDetails from "./components/details/Details";

import style from './Menu.module.css';
import ResultsPage from "./components/results-page/ResultsPage";

const {Content} = Layout;
const Menu: React.FC = () => {
    return (
        <Layout>
            <Content className={style.content_item}>
                <Switch>
                    <Route exact path='/'
                           render={() => <ResultsPage/> }/>
                    <Route path='/details'
                           render={() => <MatchDetails /> }/>
                </Switch>
            </Content>
        </Layout>
    );
}

export default Menu;

