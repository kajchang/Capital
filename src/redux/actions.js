export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
export const SET_LOADING_STAGE = 'SET_LOADING_STAGE';

export const createAccount = account => ({
    type: CREATE_ACCOUNT,
    account
});

export const setAccounts = accounts => ({
    type: SET_ACCOUNTS,
    accounts
});

export const setLoadingError = error => ({
    type: SET_LOADING_ERROR,
    error
});

export const setLoadingStage = stage => ({
    type: SET_LOADING_STAGE,
    stage
});

export const fetchAccounts = () => (
    (dispatch, getState, { neDB, AccountRegistry }) => {
        dispatch(setLoadingStage('Loading Accounts'));

        neDB.accounts.find({}, (err, accounts) => {
            if (err) {
                dispatch(setLoadingError(err));
            } else {
                dispatch(setAccounts(accounts.map(account => new (AccountRegistry.getAccountType(account.type))(account))));
            }
        })
    }
);
