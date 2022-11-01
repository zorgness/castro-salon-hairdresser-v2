import {  toast } from 'react-toastify';


export const notify = (message, type) => {

  if (type === 'login') {

    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
      icon: "⭐"
    });
  } else {

    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
      icon: "🌙"
    });

  }


}
