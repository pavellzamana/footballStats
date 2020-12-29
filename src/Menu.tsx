import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import MatchDetails from './components/details/Details';
import ResultsPage from './components/results-page/ResultsPage';
import TeamFixture from './components/team-fixture/TeamFixture';
import Registration from './components/common/registration/Registration';

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