import React from 'react'
import './Notification.css'

const Notification = ({ notifObj }) => {
  if (notifObj === null) {
    return null
  }

  if (!('type' in notifObj) || !('content' in notifObj)) {
    return null
  }

  return (
    <div className={`notification-wrapper ${notifObj.type}`}>
      <h2>{notifObj.content}</h2>
    </div>
  )
}

export default Notification