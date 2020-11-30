import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import style from './Menu.module.css'
import TreeSelector from "./components/results-page/ResultsPage";

const {Content} = Layout;
const Menu: React.FC = () => {
    return (
        <Layout>
            <Content className={style.content_item}>
                <TreeSelector/>
            </Content>
        </Layout>
    )
}

export default Menu;

