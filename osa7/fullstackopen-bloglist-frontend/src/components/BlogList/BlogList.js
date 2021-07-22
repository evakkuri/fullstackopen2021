import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../../reducers/blogReducer'
import Blog from '../Blog/Blog'

const BlogList = ({ handleAddLike }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  /**
   * Button click function to delete a blog
   */
  const handleDeleteBlog = async (blog) => {
    const confirmDelete = window.confirm(
      `Delete blog "${blog.title}" by ${blog.author}?`
    )
    console.log(confirmDelete)

    if (confirmDelete) dispatch(deleteBlog(blog.id))
  }

  return (
    <div>
      <h2>Stored blogs</h2>
      <ul>
        {blogs.data
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleAddLike={handleAddLike}
              handleDeleteBlog={handleDeleteBlog}
            />
          )}
      </ul>
    </div>
  )
}

export default BlogList