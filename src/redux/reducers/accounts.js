import { CREATE_ACCOUNT, DELETE_ACCOUNT, SET_ACCOUNTS } from '../actions';

const accounts = (state = { data: [], loaded: false }, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            return {
                data: [...state.data, action.account],
                loaded: state.loaded
            };
        case DELETE_ACCOUNT:
            return {
                data: state.data.filter(account => account._id !== action._id),
                loaded: state.loaded
            };
        case SET_ACCOUNTS:
            return {
                data: action.accounts,
                loaded: true
            };
        default:
            return state;
    }
};

export default accounts;
