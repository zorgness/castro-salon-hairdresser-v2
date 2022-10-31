import { USER_PROFILE_REQUEST, USER_PROFILE_RECEIVED, USER_PROFILE_ERROR} from "../constants";
import { fetchData} from './../../Api/FecthData'

const urlMain = process.env.REACT_APP_URL_MAIN
const userProfileUrl = `${urlMain}/api/users`

const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST
  }
}

const userProfileError = () => {
  return {
    type: USER_PROFILE_ERROR
  }
}

const userProfileReceived = userData => {
  return {
    type: USER_PROFILE_RECEIVED,
    userData
  }
}


export const fetchUserProfile = userId => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    return fetchData(userProfileUrl + '/' + userId).then(res => {
      console.log(res)
      dispatch(userProfileReceived(res))
    }).catch(err => {

      dispatch(userProfileError(err.message))
    })
  }
}
