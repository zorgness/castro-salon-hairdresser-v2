import {  toast } from 'react-toastify';


export const notify = (message, type) => {

  switch (type) {
    case 'login':
      return (
        toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        icon: "⭐"
      })
      )
    case 'logout':
      return (
        toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        icon: "🌙"
      })
      )
    case 'message':
      return (
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          icon: "📧"
        })
      )

    default:
      break
  }

}
