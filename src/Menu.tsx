import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import MatchDetails from './components/Details/Details';
import ResultsPage from './components/Results-page/ResultsPage';
import TeamFixture from './components/Team-fixture/TeamFixture';
import Registration from './components/Registration/Registration';

import style from './Menu.module.css';

const { Content } = Layout;
const Menu: React.FC = () => {
    return (
        <Layout>
            <Content className={style.content_item}>
                <Switch>
                    <Route exact path='/'
                           render={() => <ResultsPage />} />
                    <Route path='/details'
                           render={() => <MatchDetails />} />
                    <Route path='/team'
                           render={() => <TeamFixture />} />
                    <Route path='/registration'
                           render={() => <Registration />} />
                </Switch>
            </Content>
        </Layout>
    );
};

export default Menu;