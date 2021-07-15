const Notification = ({ notification }) => {
  const isDisplayed = notification !== ''

  const style = {
    display: isDisplayed
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification