/* eslint-disable indent */
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = null

// eslint-disable-next-line no-unused-vars
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification(
        'error', 'Wrong username or password'
      ))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer