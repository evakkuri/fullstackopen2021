import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const setNotification = jest.fn()
  const blogs = []
  const setBlogs = jest.fn()

  const component = render(
    <BlogForm
      createBlog={createBlog}
      setNotification={setNotification}
      blogs={blogs}
      setBlogs={setBlogs}
    />
  )

  const inputTitle = component.container.querySelector('input:nth-child(1)')
  //console.log(prettyDOM(inputTitle))

  const inputAuthor = component.container.querySelector('input:nth-child(2)')
  //console.log(prettyDOM(inputAuthor))

  const inputUrl = component.container.querySelector('input:nth-child(3)')
  //console.log(prettyDOM(inputUrl))

  const form = component.container.querySelector('form')
  //console.log(prettyDOM(form))

  fireEvent.change(inputTitle, {
    target: { value: 'Testing of forms could be easier' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Test Author' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'https://test.url' }
  })
  fireEvent.submit(form)

  //console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing of forms could be easier' )
})