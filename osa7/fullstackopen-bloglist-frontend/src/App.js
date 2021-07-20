import React, { useEffect } from 'react'
import Notification from './components/Notification/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Togglable from './components/Togglable/Togglable'
import BlogList from './components/BlogList/BlogList'
import UserList from './components/UserList/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import { initializeUserList } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
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
        {user === null ?
          loginForm() :
          <p>
            {user.name} is logged in
            <button id='logout' onClick={handleLogout}>Log out</button>
          </p>
        }
      </div>
      <Switch>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <div>
            <Notification />
          </div>
          {user === null ?
            null :
            <div>
              {blogForm()}
              <BlogList />
            </div>
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App