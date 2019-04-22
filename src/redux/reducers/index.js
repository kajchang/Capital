import { combineReducers } from 'redux';

import accounts from './accounts';
import currencies from './currencies';
import { database } from '../persist';
import loading from './loading';

export default combineReducers({
    accounts,
    currencies,
    database,
    loading
});
