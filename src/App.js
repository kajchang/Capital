import React  from 'react';
import Landing from './pages/Landing';

import { HashRouter, Route } from 'react-router-dom';

const App = () => (
    <HashRouter>
        <div>
            <Route path='/' exact component={ Landing }/>
        </div>
    </HashRouter>
);

export default App;
