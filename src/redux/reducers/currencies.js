import { SET_CURRENCIES } from '../actions';

const currencies = (state = { data: {}, loaded: false }, action) => {
    switch (action.type) {
        case SET_CURRENCIES:
            return {
                data: action.currencies,
                loaded: true
            };
        default:
            return state;
    }
};

export default currencies;
