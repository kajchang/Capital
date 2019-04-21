import { remote } from 'electron';

import { CREATE_ACCOUNT } from './actions';

export let neDB = {};

export const connect = () => {
    neDB = remote.getGlobal('db');
};

export const database = (state, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            neDB.accounts.insert(action.account.serialize());
            break
    }

    return neDB;
};
