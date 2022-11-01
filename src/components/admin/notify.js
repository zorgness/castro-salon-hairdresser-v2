import {  toast } from 'react-toastify';


export const notify = (message) => {

  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });


}
