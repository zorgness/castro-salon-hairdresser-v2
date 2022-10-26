import { USER_LOGIN_SUCCESS } from "../constants"

const initialState = {
  token: null,
  userId: null
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      console.log('authReducer')
      return {
        ...state,
        token: action.token,
        userId: action.userId
      }
    default:
      return state
  }
}
