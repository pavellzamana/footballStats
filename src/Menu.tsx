import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";

import style from './Menu.module.css'
import TreeSelector from "./components/results-page/ResultsPage";

const {Content} = Layout;
const Menu: React.FC = () => {
    return (
        <Layout>
            <Content className={style.content_item}>
                <Switch>
                    <Route path='/'
                           render={() => <TreeSelector/> }/>
                </Switch>
            </Content>
        </Layout>
    )
}

export default Menu;

