import { combineReducers } from 'redux';

import accounts from './accounts';
import error from './error';
import { database } from '../persist';

export default combineReducers({
    accounts,
    database,
    error
});
