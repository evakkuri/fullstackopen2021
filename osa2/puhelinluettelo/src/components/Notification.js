import React from 'react'

const Notification = ({ messageObj }) => {

  if (messageObj === null) {
    return null
  }

  console.log("Notification - messageObj", messageObj)

  return (
    <div className={messageObj.type}>
      {messageObj.text}
    </div>
  )
}

export default Notification