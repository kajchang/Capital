import { CREATE_ACCOUNT, SET_ACCOUNTS } from '../actions';

const accounts = (state = { data: [], loaded: false }, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            return {
                data: [...state.data, action]
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
