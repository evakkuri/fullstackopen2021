import React, { useEffect } from 'react'
import Notification from './components/Notification/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Togglable from './components/Togglable/Togglable'
import BlogList from './components/BlogList/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Log in'>
        <LoginForm />
      </Togglable>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='Add new blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <h1>Cool Blog App</h1>
      <div>
        <Notification />
      </div>
      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} is logged in
            <button id='logout' onClick={handleLogout}>Log out</button>
          </p>
          {blogForm()}
          <BlogList />
        </div>
      }
    </div>
  )
}

export default App