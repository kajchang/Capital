import { combineReducers } from 'redux';

import accounts from './accounts';
import loading from './loading';
import { database } from '../persist';

export default combineReducers({
    accounts,
    database,
    loading
});
