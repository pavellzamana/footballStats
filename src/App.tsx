import React from 'react';
import 'antd/dist/antd.css';
import FetchDataForResults from "./components/results/FetchDataForResults";
import { Layout } from 'antd';
import style from './App.module.css'

const { Header, Content, Footer } = Layout;
const App = () => {
    return (
        <Layout>
            <Header>
            </Header>
            <Content className={style.contentItem}>
                <FetchDataForResults />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )

}

export default App;
