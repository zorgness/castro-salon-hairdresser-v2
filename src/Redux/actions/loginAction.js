import { USER_LOGIN_SUCCESS } from "../constants"
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod"

const urlMain = process.env.REACT_APP_URL_MAIN
const userUrl = `${urlMain}/api/login`

export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId
  }
}

export const userLoginAttempt = (options) => {
  // const options = {email: email, password: password}
  return (dispatch) => {
    return fetchDataWithMethod( userUrl, 'POST', options).then(res => {
      dispatch(userLoginSuccess(res.token, res.id))
    }).catch(err => {
      console.error(err.message)
    })
  }
}
