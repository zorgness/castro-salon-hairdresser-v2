import { USER_LOGIN_SUCCESS } from "./constants";


export const tokenMiddleware = store => next => action => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', action.token);
      localStorage.setItem('userId', action.userId);
      localStorage.setItem('authenticated', action.isAuthenticated);

      break;
      default:
  }
  next(action);
}
