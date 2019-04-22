import axios from 'axios';

import TransactionModel from '../models/TransactionModel';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
export const SET_LOADING_STAGE = 'SET_LOADING_STAGE';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const createAccount = account => ({
    type: CREATE_ACCOUNT,
    account
});

export const setAccounts = accounts => ({
    type: SET_ACCOUNTS,
    accounts
});

export const setCurrencies = currencies => ({
    type: SET_CURRENCIES,
    currencies
});

export const setTransactions = transactions => ({
    type: SET_TRANSACTIONS,
    transactions
});

export const createTransaction = transaction => ({
    type: CREATE_TRANSACTION,
    transaction
});

export const setLoadingError = error => ({
    type: SET_LOADING_ERROR,
    error
});

export const setLoadingStage = stage => ({
    type: SET_LOADING_STAGE,
    stage
});

// um

export const doAllLoad = () => (
    dispatch => {
        const tasks = [fetchAccounts, fetchTransactions, loadExchangeRates];
        let idx = 0;

        const next = () => {
            if (idx === tasks.length) return;

            dispatch(tasks[idx](next));
            idx++;
        };

        next();
    }
);

export const fetchAccounts = next => (
    (dispatch, getState, { neDB, AccountRegistry }) => {
        dispatch(setLoadingStage('Loading Accounts'));

        neDB.accounts.find({}, (err, accounts) => {
            if (err) {
                dispatch(setLoadingError(err));
            } else {
                dispatch(setAccounts(accounts.map(account => new (AccountRegistry.getAccountType(account.type))(account))));
                next();
            }
        });
    }
);

export const fetchTransactions = next => (
    (dispatch, getState, { neDB, AccountRegistry }) => {
        dispatch(setLoadingStage('Loading Transactions'));

        neDB.transactions.find({}, (err, transactions) => {
            if (err) {
                dispatch(setLoadingError(err));
            } else {
                dispatch(setTransactions(transactions.map(transaction => new TransactionModel(transaction))));
                next();
            }
        });
    }
);

export const loadExchangeRates = next => (
    dispatch => {
        dispatch(setLoadingStage('Loading Exchange Rates'));

        axios.get('https://api.exchangeratesapi.io/latest?base=USD')
            .then(resp => {
                dispatch(setCurrencies(resp.data.rates));
                next();
            })
            .catch(err => dispatch(setLoadingError(err)));
    }
);
