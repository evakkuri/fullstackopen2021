import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleAddLike, handleDeleteBlog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

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

  if (!showFullInfo)
    return (
      <div id={getBlogIdField(blog.id, blog.title)} style={blogStyle} className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> ({blog.likes})
        <button onClick={toggleVisibility}>Show more</button>
      </div>
    )

  else return (
    <div id={getBlogIdField(blog.id, blog.title)} style={blogStyle} className='blog'>
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> ({blog.likes})
        <button id={`show-less-${blog.id}`} onClick={toggleVisibility}>Show less</button>
      </p>
      <p>
        Author: {blog.author}
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
