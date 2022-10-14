import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customizationReducer from "./customization/customizationReducer"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customization: customizationReducer
  },
});
