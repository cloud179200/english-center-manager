import * as actionTypes from "./actions";

export const initialState = {
  notifications: [],
  loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION_ACTION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action}],
      };
    case actionTypes.REMOVE_NOTIFICATION_ACTION:
      return {
        ...state,
        notifications: state.notifications.filter((item) => item.id !== action.id),
      };
    case actionTypes.SET_LOADING_ACTION:
      return {...state, loading: action.state};
    default:
      return state;
  }
};

export default utilsReducer;
