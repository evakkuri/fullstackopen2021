/* eslint-disable indent */
import usersService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_USERLIST':
      return action.data
    default:
      return state
  }
}

export const initializeUserList = () => {
  return async dispatch => {
    try {
      const userArray = await usersService.getAll()
      dispatch({
        type: 'INITIALIZE_USERLIST',
        data: userArray
      })
    } catch (error) {
      const errorContent = error.response ? error.response.data.error : error
      dispatch(setNotification(
        'error',
        errorContent
      ))
    }
  }
}

export default userReducer
