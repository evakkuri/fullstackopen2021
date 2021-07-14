const initialState = {content: '', timeoutId: ''}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        content: action.content,
        timeoutId: action.timeoutId
      }
    default:
      return state
  }
}

export const setNotification = (content, timeout = 5000) => {
  return async (dispatch, getState) => {
    const currTimeoutId = getState().notification.timeoutId
    if (currTimeoutId !== '') clearTimeout(currTimeoutId)

    const newTimeoutId = setTimeout(() => { dispatch(removeNotification()) }, timeout)

    dispatch({
      type: 'SET_NOTIFICATION',
      content,
      timeoutId: newTimeoutId
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    content: '',
    timeoutId: ''
  }
}

export default notificationReducer