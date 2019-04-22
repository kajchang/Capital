import React from 'react';
import reducer from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App';
import { connect, neDB } from './redux/persist';
import AccountRegistry from './utils/AccountRegistry';

import 'bootstrap/dist/css/bootstrap.min.css';

import './implementations/Account/Cash';
import './implementations/Account/Bank';

connect();

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(<Provider store={ createStore(reducer, applyMiddleware(thunk.withExtraArgument({ neDB, AccountRegistry }))) }>
    <App/>
</Provider>, document.getElementById('root'));
