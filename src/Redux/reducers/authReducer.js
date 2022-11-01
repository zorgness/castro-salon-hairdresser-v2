import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_CLOSE_MODAL,
  USER_OPEN_MODAL,
  USER_SET_ID,
  USER_PROFILE_RECEIVED,
  USER_LOGOUT

  } from "../constants"

const initialState = {
  token: null,
  userId: null,
  error: null,
  modal: false,
  isAuthenticated: false,
  userData: null
}

const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        modal: true,
        isAuthenticated: true
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        error: action.error
      }
    case USER_OPEN_MODAL:
      return {
        ...state,
        modal: true
      }
    case USER_CLOSE_MODAL:
      return {
        ...state,
        modal: false
      }
    case USER_SET_ID:
        return {
          ...state,
          userId: action.userId,
          isAuthenticated: true
        };
    case USER_PROFILE_RECEIVED:
      return {
        ...state,
        userData: action.userData
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        modal: false,
        isAuthenticated: false,
        userData: null

      }

    default:
      return state
  }
}

export default authReducer
