/* eslint-disable indent */
const initialState = { type: '', content: '', timeoutId: '' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...action.data }
    default:
      return state
  }
}

export const setNotification = (type, content, timeout = 5000) => {
  return async (dispatch, getState) => {
    const currTimeoutId = getState().notification.timeoutId
    if (currTimeoutId !== '') clearTimeout(currTimeoutId)

    const newTimeoutId = setTimeout(() => { dispatch(removeNotification()) }, timeout)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        type,
        content,
        timeoutId: newTimeoutId
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: initialState
  }
}

export default notificationReducer