import React from 'react';
import { Layout as Template } from 'antd';
import Routes from './Routes.jsx';

const { Content } = Template;

const Layout = () => {
  return (
    <Content className="contaiter main-layout">
      <Routes />
    </Content>
  );
};

export default Layout;
