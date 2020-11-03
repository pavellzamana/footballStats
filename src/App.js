import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ResultsContainer from "./components/results/ResultsContainer";
import { Layout, Menu } from 'antd';

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
            <Content style={{ margin: '0 auto' }}>
                <div className="site-layout-content"><ResultsContainer /></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )

}

export default App;
