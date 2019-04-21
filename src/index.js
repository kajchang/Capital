import React from 'react';
import reducer from './redux/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(<Provider store={ createStore(reducer) }>
    <App/>
</Provider>, document.getElementById('root'));
