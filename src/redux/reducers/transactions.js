import { CREATE_TRANSACTION, SET_TRANSACTIONS } from '../actions';

const transactions = (state = { data: [], loaded: false }, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return {
                data: [...state.data, action.transaction],
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
