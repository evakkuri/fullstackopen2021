import React, { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import Notification from './components/Notification/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Togglable from './components/Togglable/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    try {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
      )
    } catch (exception) {
      return []
    }
  }, [])

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
      setNotification({ type: 'error', content: 'Wrong username or password' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    window.location.reload()
  }

  const handleAddLike = async (blog, event) => {
    event.preventDefault()

    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(`Updating blog ID ${blog.id} with new value ${JSON.stringify(updatedBlog)}`)

    try {
      blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (exception) {
      console.log(`Error when adding a like to blog ${blog.id}. Exception: ${exception}`)
      setNotification({
        type: 'error',
        content: `Error when adding a like to blog ${blog.id}. Exception: ${exception}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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
        createBlog={blogService.create}
        setNotification={setNotification}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Cool Blog App</h1>

      <div>
        <Notification notifObj={notification} />
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
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              handleAddLike={handleAddLike}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App