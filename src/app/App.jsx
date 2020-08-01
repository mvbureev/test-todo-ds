import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import stores from '../stores';
import Layout from '../layout';

const App = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
