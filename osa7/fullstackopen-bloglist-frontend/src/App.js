import React, { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import Notification from './components/Notification/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Togglable from './components/Togglable/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(
        'error', 'Wrong username or password'
      ))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    window.location.reload()
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Log in'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='Add new blog'>
      <BlogForm
        setNotification={setNotification}
      />
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
          <h2>Stored blogs</h2>
          {blogs.data.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App