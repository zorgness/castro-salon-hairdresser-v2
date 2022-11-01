import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_OPEN_MODAL,
  USER_CLOSE_MODAL,
  USER_LOGOUT,
  USER_SET_ID,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_ERROR
 } from "../constants";
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";
import { fetchData } from "../../Api/FecthData";

const urlMain = process.env.REACT_APP_URL_MAIN
const userLoginUrl = `${urlMain}/api/login`
const userProfileUrl = `${urlMain}/api/users/`

const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId,
    modal: true,
    isAuthenticated: true
  }
};

const userLoginError = error => {
  return {
    type: USER_LOGIN_FAILED ,
    error
  }
};

const openModal = () => {

  return {
    type: USER_OPEN_MODAL,
    modal: true
  }
};

export const closeModal = () => {
  return {
    type: USER_CLOSE_MODAL,
    modal: false
  }
};

export const userLoginAttempt = (options) => {
  return (dispatch) => {
    return fetchDataWithMethod( userLoginUrl, 'POST', options).then(res => {
      dispatch(userLoginSuccess(res.token, res.id), openModal())
    }).catch(err => {
      dispatch(userLoginError(err.message))
    })
  }
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
};

export const userSetId = (userId) => {
  return {
    type: USER_SET_ID,
    userId,
    isAuthenticated: true
  }
};

export const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST
  }
};

export const userProfileError = (userId) => {
  return {
    type: USER_PROFILE_ERROR,
    userId
  }
};

export const userProfileReceived = (userId, userData) => {
  return {
    type: USER_PROFILE_RECEIVED,
    userData,
    userId,
    isAuthenticated: true
  }
};

export const userProfileFetch = (userId) => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    return fetchData(userProfileUrl + userId).then(
      response => {
        dispatch(userProfileReceived(userId, response))
      }
    ).catch(() => dispatch(userProfileError(userId)))
  }
};
