import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../../reducers/blogReducer'
import Blog from '../Blog/Blog'
import { Table } from 'react-bootstrap'

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
      <Table>
        <tbody>
          {blogs.data
            .map(blog =>
              <tr key={blog.id}>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleAddLike={handleAddLike}
                  handleDeleteBlog={handleDeleteBlog}
                />
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList