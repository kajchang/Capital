export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const createAccount = account => ({
    type: CREATE_ACCOUNT,
    account
});

export const setAccounts = accounts => ({
    type: SET_ACCOUNTS,
    accounts
});

export const setError = error => ({
    type: SET_ERROR,
    error
});

export const clearError = () => ({
    type: CLEAR_ERROR
});

export const fetchAccounts = () => (
    (dispatch, getState, { neDB, AccountRegistry }) => neDB.accounts.find({}, (err, accounts) => {
        if (err) {
            dispatch(setError(err));
        } else {
            dispatch(setAccounts(accounts.map(account => new (AccountRegistry.getAccountType(account.type))(account))));
            dispatch(clearError());
        }
    })
);
