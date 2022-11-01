import * as actionTypes from './action';

export const initialState = {
    userInfo: null,
    userDetail: null,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_ACTION:
            return {
                ...state,
                userInfo: action.payload
            };
        case actionTypes.SET_USER_DETAIL_ACTION:
            return {
                ...state,
                userDetail: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
