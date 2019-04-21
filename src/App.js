import React  from 'react';
import Landing from './components/Landing';
import CreateAccount from './components/CreateAccount';

import { HashRouter, Route } from 'react-router-dom';

const App = () => (
    <HashRouter>
        <div>
            <Route path='/' exact component={ Landing }/>
            <Route path='/createaccount' exact component={ CreateAccount }/>
        </div>
    </HashRouter>
);

export default App;
