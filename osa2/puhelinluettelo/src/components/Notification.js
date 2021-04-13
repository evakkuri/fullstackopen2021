import React from 'react'

const Notification = ({ messageObj }) => {

  if (messageObj === null) {
    return null
  }

  return (
    <div className={messageObj.type}>
      {messageObj.text}
    </div>
  )
}

export default Notification