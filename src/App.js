import React  from 'react';
import Landing from './pages/Landing';
import Loader from './components/Loader';
import Layout from './components/Layout'
import { HashRouter, Route } from 'react-router-dom';

const App = () => (
    <HashRouter>
        <Layout>
            <Loader>
                <Route path='/' exact component={ Landing }/>
            </Loader>
        </Layout>
    </HashRouter>
);

export default App;
