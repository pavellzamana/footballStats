import React from 'react';
import { Layout } from 'antd';
import Menu from "./Menu";

import 'antd/dist/antd.css';

const { Header, Footer } = Layout;
const App: React.FC = () => {
    return (
        <Layout>
            <Header>
            </Header>
            <Menu />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default App;
