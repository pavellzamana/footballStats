import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import style from './Menu.module.css'
import Results from "./components/results/Results";

const {Content} = Layout;
const Menu: React.FC = () => {
    return (
        <Content className={style.contentItem}>
            <Results/>
        </Content>
    )
}

export default Menu;

