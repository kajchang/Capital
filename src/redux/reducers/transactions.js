import { CREATE_TRANSACTION, DELETE_ACCOUNT, SET_TRANSACTIONS } from '../actions';

const transactions = (state = { data: [], loaded: false }, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return {
                data: [...state.data, action.transaction],
                loaded: state.loaded
            };
        case DELETE_ACCOUNT:
            return {
                data: state.data.filter(transaction => transaction.accountId !== action._id),
                loaded: state.loaded
            };
        case SET_TRANSACTIONS:
            return {
                data: action.transactions,
                loaded: true
            };
        default:
            return state;
    }
};

export default transactions;
