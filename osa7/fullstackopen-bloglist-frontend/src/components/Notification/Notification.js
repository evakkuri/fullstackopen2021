import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification.type === '' || notification.content === '') {
    return null
  }

  return (
    <div className={`notification-wrapper ${notification.type}`}>
      <h2>{notification.content}</h2>
    </div>
  )
}

export default Notification