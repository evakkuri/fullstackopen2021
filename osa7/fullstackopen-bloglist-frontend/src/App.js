import React, { useEffect } from 'react'
import Notification from './components/Notification/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Togglable from './components/Togglable/Togglable'
import BlogList from './components/BlogList/BlogList'
import BlogFull from './components/BlogFull/BlogFull'
import UserList from './components/UserList/UserList'
import User from './components/User/User'
import Menu from './components/Menu/Menu'
import { initializeBlogs, addLike } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUserList } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [])

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

  const userById = (id) =>
    users.find(a => a.id === id)

  const userMatch = useRouteMatch('/users/:id')
  const userToShow = userMatch
    ? userById(userMatch.params.id)
    : null

  console.log(blogs)

  const blogById = (id) =>
    blogs.data.find(a => a.id === id)

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogById(blogMatch.params.id)
    : null

  const handleAddLike = async (blog, event) => {
    event.preventDefault()

    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(`Updating blog ID ${blog.id} with new value ${JSON.stringify(updatedBlog)}`)

    try {
      dispatch(addLike(blog.id))
    } catch (exception) {
      console.log(`Error when adding a like to blog ${blog.id}. Exception: ${exception}`)
    }
  }

  return (
    <div className='container'>
      <Menu />
      <h1>Cool Blog App</h1>
      <div>
        <Notification />
      </div>
      <div>
        {login === null
          ? loginForm()
          : null
        }
      </div>
      <div>
        {login !== null ?
          <Switch>
            <Route path='/users/:id'>
              <User user={userToShow} />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/blogs/:id'>
              <BlogFull blog={blogToShow} handleAddLike={handleAddLike} />
            </Route>
            <Route path='/'>
              <div>
                {blogForm()}
                <BlogList handleAddLike={handleAddLike} />
              </div>
            </Route>
          </Switch>
          : null}
      </div>
    </div>
  )
}

export default App