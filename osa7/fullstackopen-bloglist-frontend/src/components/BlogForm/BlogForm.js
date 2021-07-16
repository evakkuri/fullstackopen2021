import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'

const BlogForm = ({ setNotification }) => {

  const dispatch = useDispatch()

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log('Adding new blog...')

    try {
      /*
      const blog = await createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      */

      dispatch(createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      }))

      console.log(`A new blog "${newBlog.title}" by ${newBlog.author} was added successfully`)

      setNotification({
        type: 'success',
        content: `A new blog "${newBlog.title}" by ${newBlog.author} was added successfully`
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      //setBlogs(blogs.concat(blog))

      setNewBlog({
        title: '',
        author: '',
        url: ''
      })

    } catch (exception) {
      setNotification({ type: 'error', content: `Error when adding new blog: ${exception}` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleAddBlog}>
      Title:
      <input
        id='input-title'
        type="text"
        value={newBlog.title}
        name="Title"
        onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
      />
      Author:
      <input
        id='input-author'
        type="text"
        value={newBlog.author}
        name="Author"
        onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
      />
      Url:
      <input
        id='input-url'
        type="text"
        value={newBlog.url}
        name="Url"
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
      />
      <button id='submit-blog-form' type="submit">Add blog</button>
    </form>
  )
}

export default BlogForm