import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_OPEN_MODAL, USER_CLOSE_MODAL   } from "../constants"
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod"

const urlMain = process.env.REACT_APP_URL_MAIN
const userUrl = `${urlMain}/api/login`

const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId,

  }
}

const userLoginError = error => {
  return {
    type: USER_LOGIN_FAILED ,
    error
  }
}

const openModal = () => {

  return {
    type: USER_OPEN_MODAL,
    modal: true
  }
}

export const closeModal = () => {
  console.log('close')
  return {
    type: USER_CLOSE_MODAL,
    modal: false

  }
}

// export const closeModal = () => {
//   console.log('close')
//   return (dispatch) => {
//     return dispatch(userCloseModal)
//   }
// }

export const userLoginAttempt = (options) => {
  return (dispatch) => {
    return fetchDataWithMethod( userUrl, 'POST', options).then(res => {
      dispatch(userLoginSuccess(res.token, res.id), openModal())
    }).catch(err => {
      dispatch(userLoginError(err.message))
    })
  }
}
