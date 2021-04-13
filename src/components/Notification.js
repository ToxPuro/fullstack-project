import React from "react"

const Notification= ({ notification }) => {
  if(notification===null){
    return null
  }
  let style = "success"
  if(notification.error){
    style="error"
  }
  return(
    <div id="notification"className={style}>
      {notification.message}
    </div>
  )
}

export default Notification