import { combineReducers } from 'redux';

import accounts from './accounts';
import currencies from './currencies';
import { database } from '../persist';
import loading from './loading';
import transactions from './transactions';

export default combineReducers({
    accounts,
    currencies,
    database,
    loading,
    transactions
});
