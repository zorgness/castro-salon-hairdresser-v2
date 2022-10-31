import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_CLOSE_MODAL,
  USER_OPEN_MODAL,
  USER_LOGOUT

  } from "../constants"

const initialState = {
  token: null,
  userId: null,
  error: null,
  modal: false,
  isAuthenticated: false
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
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        modal: false,
        isAuthenticated: false

      }

    default:
      return state
  }
}

export default authReducer
