import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../../reducers/blogReducer'

//import blogService from '../../services/blogs'

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setShowFullInfo(!showFullInfo)
  }

  const currentLoggedInUser = JSON.parse(
    window.localStorage.getItem('loggedInBlogAppUser'))

  const currentUsername =
    currentLoggedInUser ? currentLoggedInUser.username : ''

  const deleteButtonVisible = {
    display: blog.user.username === currentUsername
      ? ''
      : 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getBlogIdField = (blogId, blogTitle) => {
    return [blogId, blogTitle.replace(/\s+/g, '').toLowerCase()].join('-')
  }

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

  if (!showFullInfo)
    return (
      <div id={getBlogIdField(blog.id, blog.title)} style={blogStyle} className='blog'>
        {blog.author}: {blog.title} ({blog.likes})
        <button id={`show-more-${blog.id}`} onClick={toggleVisibility}>Show more</button>
      </div>
    )

  else return (
    <div id={getBlogIdField(blog.id, blog.title)} style={blogStyle} className='blog'>
      <p>
        {blog.author}: {blog.title}
        <button id={`show-less-${blog.id}`} onClick={toggleVisibility}>Show less</button>
      </p>
      <p>
        URL: {blog.url}
      </p>
      <p>
        Likes: {blog.likes}
        <button id={`like-${blog.id}`} onClick={(event) => handleAddLike(blog, event)}>Like</button>
      </p>
      <div>
        Added by: {blog.user.name}
      </div>
      <div style={deleteButtonVisible}>
        <button id={`delete-blog-${blog.id}`} onClick={() => handleDeleteBlog(blog)}>Delete blog</button>
      </div>
    </div>
  )
}

export default Blog