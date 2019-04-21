import { CREATE_ACCOUNT } from '../actions';

const accounts = (state = [], action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            return [...state, action.account];
        default:
            return state;
    }
};

export default accounts;
