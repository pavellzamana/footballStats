import React from 'react';
import 'antd/dist/antd.css';
import FetchDataForResults from "./components/results/FetchDataForResults";
import { Layout } from 'antd';

import style from './Menu.module.css'

const {Content} = Layout;
const Menu: React.FC = () => {
    return (
        <Content className={style.contentItem}>
            <FetchDataForResults/>
        </Content>
    )
}

export default Menu;

