import { SET_LOADING_STAGE, SET_LOADING_ERROR } from '../actions';

const loading = (state = { stage: '', error: '' }, action) => {
    switch (action.type) {
        case SET_LOADING_STAGE:
            return {
                ...state,
                stage: action.stage
            };
        case SET_LOADING_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default loading;
