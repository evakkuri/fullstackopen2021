import React from 'react'

const BlogFull = ({ blog, handleAddLike }) => {
  if (!blog) { return null }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        Link to original: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes
        <button onClick={(event) => handleAddLike(blog, event)}>Like</button>
      </p>
      <p>Added by {blog.user.name}</p>
    </div>
  )
}

export default BlogFull
