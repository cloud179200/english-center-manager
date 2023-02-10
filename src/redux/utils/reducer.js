import * as actionTypes from "./actions";
import _ from "underscore";
export const initialState = {
  notifications: [],
  loading: false,
  loadingCommon: false,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const utilsReducer = (state = _.clone(initialState), action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION_ACTION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action }],
      };
    case actionTypes.REMOVE_NOTIFICATION_ACTION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item.id !== action.id
        ),
      };
    case actionTypes.SET_LOADING_ACTION:
      return { ...state, loading: action.state };
    case actionTypes.SET_LOADING_COMMON_ACTION:
      return { ...state, loadingCommon: action.state };
    case actionTypes.RESET_UTILS_REDUCER_ACTION:
      return _.clone(initialState);
    default:
      return state;
  }
};

export default utilsReducer;
