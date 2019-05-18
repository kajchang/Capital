import React  from 'react';
import Landing from './pages/Landing';
import Accounts from './pages/Accounts';
import Account from './pages/Account';
import Loader from './components/Loader';
import Layout from './components/Layout';
import { HashRouter, Route } from 'react-router-dom';

const App = () => (
    <HashRouter>
        <Layout>
            <Loader>
                <Route path='/' exact component={ Landing }/>
                <Route path='/accounts' exact component={ Accounts }/>
                <Route path='/accounts/:accountId' exact component={ Account }/>
            </Loader>
        </Layout>
    </HashRouter>
);

export default App;
