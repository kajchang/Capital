import { combineReducers } from 'redux';

import accounts from './accounts';
import { database } from '../persist';

export default combineReducers({
    accounts,
    database
});
