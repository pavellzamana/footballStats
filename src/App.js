import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import FetchDataForResults from "./components/results/FetchDataForResults";
import { Layout, Menu } from 'antd';
import style from './App.module.css'

const { Header, Content, Footer } = Layout;
const App = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className={style.contentItem}>
                <FetchDataForResults />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )

}

export default App;
