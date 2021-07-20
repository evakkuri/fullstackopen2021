/* eslint-disable indent */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
  isLoading: false,
  loaded: false,
  data: [],
  error: null
}

const blogReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      return {
        ...state,
        data: state.data
          .map((blog) => blog.id === action.id
            ? { ...blog, likes: blog.likes + 1 }
            : blog)
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
      }

    case 'NEW_BLOG_SUCCESS':
      return {
        ...state,
        loaded: true,
        data: [...state.data, action.data]
      }

    case 'NEW_BLOG_FAILURE':
      return {
        ...state,
        loaded: false,
        error: action.data
      }

    case 'INIT_BLOGS_SUCCESS':
      return {
        ...state,
        loaded: true,
        data: action.data
      }

    case 'INIT_BLOGS_FAILURE':
      return {
        ...state,
        loaded: false,
        error: action.data
      }

    case 'DELETE_BLOG':
      return {
        ...state,
        data: state.data.filter(blog => blog.id !== action.id)
      }

    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogArray = await blogService.getAll()
      const sortedArray = blogArray.sort((blog1, blog2) => blog2.likes - blog1.likes)
      dispatch({
        type: 'INIT_BLOGS_SUCCESS',
        data: sortedArray,
      })
    } catch (error) {
      const errorContent = error.response ? error.response.data.error : error
      dispatch({
        type: 'INIT_BLOGS_FAILURE',
        data: errorContent
      })
      dispatch(setNotification(
        'error',
        errorContent
      ))
    }
  }
}

export const addLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs.data
    console.log(blogs)
    const blogToLike = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    await blogService.update(id, updatedBlog)
    dispatch({
      type: 'LIKE',
      id
    })
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(data)
      dispatch({
        type: 'NEW_BLOG_SUCCESS',
        data: newBlog
      })
      dispatch(setNotification(
        'success',
        `Blog created successfully: ${newBlog.title}`
      ))
    } catch (error) {
      const errorContent = error.response.data.error
      dispatch({
        type: 'NEW_BLOG_FAILURE',
        data: errorContent
      })
      dispatch(setNotification(
        'error',
        `Error when creating new blog: ${errorContent}`))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
    } catch (error) {
      console.warn(error)
    }
  }
}

export default blogReducer