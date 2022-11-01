import * as actionTypes from './actions';

export const initialState = {
    page: ""
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NEXT_PAGE_ACTION:
            return {
                ...state,
                page: action,
            };
        default:
            return state;
    }
};

export default utilsReducer;
