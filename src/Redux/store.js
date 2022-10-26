import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'
import { tokenMiddleware } from './middleware';



const store = configureStore({
  reducer : {
    loginUser: authReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(tokenMiddleware)


})

export default store;
