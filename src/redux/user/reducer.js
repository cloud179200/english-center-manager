import * as actionTypes from "./action";
import _ from "lodash";
export const initialState = {
  userInfo: null,
  userDetail: null,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = _.cloneDeep(initialState), action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ACTION:
      return {
        ...state,
        userInfo: action.data,
      };
    case actionTypes.REMOVE_USER_ACTION:
      return {
        ...state,
        userInfo: null,
      };
    case actionTypes.SET_USER_DETAIL_ACTION:
      return {
        ...state,
        userDetail: action.data,
      };
    case actionTypes.REMOVE_USER_DETIAL_ACTION:
      return {
        ...state,
        userDetail: action.data,
      };
    case actionTypes.RESET_USER_REDUCER_ACTION:
        return _.cloneDeep(initialState)
    default:
      return state;
  }
};

export default userReducer;
