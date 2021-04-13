import React from "react"

const Notification= ({ notification }) => {
  if(notification===null){
    return null
  }
  if(!notification.error){
    return(
      <div className="success">
        {notification.message}
      </div>
    )
  }
  return(
    <div className="error">
      {notification.message}
    </div>
  )
}

export default Notification