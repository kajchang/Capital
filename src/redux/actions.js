export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const createAccount = account => ({
    type: CREATE_ACCOUNT,
    account
});

export const setAccounts = accounts => ({
    type: SET_ACCOUNTS,
    accounts
});
