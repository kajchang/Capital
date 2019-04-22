import { remote } from 'electron';

import { CREATE_ACCOUNT, CREATE_TRANSACTION } from './actions';

export let neDB = {};

export const connect = () => {
    neDB = remote.getGlobal('db');
};

export const database = (state, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            neDB.accounts.insert(action.account.serialize(), err => {
                if (err) return console.log(err);
            });
            break;
        case CREATE_TRANSACTION:
            neDB.transactions.insert(action.transaction.serialize(), err => {
                if (err) return console.log(err);
            });
            break;
    }

    return neDB;
};
