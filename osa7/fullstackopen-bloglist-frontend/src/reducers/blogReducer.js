/* eslint-disable indent */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      console.log(`Adding like to blog ${action.id}`)

      return state
        .map((blog) => blog.id === action.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog)
        .sort((blog1, blog2) => blog2.likes - blog1.likes)

    case 'NEW_BLOG':
      console.log(`Adding new blog: ${JSON.stringify(action.data)}`)
      return [...state, action.data]

    case 'INIT_BLOGS':
      return action.data

    case 'DELETE_BLOG':
      console.log(action)
      console.log(state.filter(blog => blog.id !== action.id))
      return state.filter(blog => blog.id !== action.id)

    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogArray = await blogService.getAll()
    const sortedArray = blogArray.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedArray,
    })
  }
}

export const addLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
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
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
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