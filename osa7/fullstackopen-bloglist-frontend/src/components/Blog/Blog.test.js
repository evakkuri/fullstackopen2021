import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Elias Vakkuri',
      user: { username: 'elias.vakkuri' },
      url: 'testurl',
      likes: 0
    }

    const blogs = []
    const setBlogsMock = jest.fn()

    const component = render(
      <Blog blog={blog} blogs={blogs} setBlogs={setBlogsMock} />
    )

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('initially blog is rendered in shortened format', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Elias Vakkuri',
      user: { username: 'elias.vakkuri' },
      url: 'testurl',
      likes: 0
    }

    const blogs = []
    const setBlogsMock = jest.fn()

    const component = render(
      <Blog blog={blog} blogs={blogs} setBlogs={setBlogsMock} />
    )

    expect(component.container).toHaveTextContent(
      `${blog.author}: ${blog.title}`
    )

    expect(component.container).not.toHaveTextContent(
      'Likes'
    )

    expect(component.container).not.toHaveTextContent(
      'URL'
    )
  })

  test('after clicking the "Show more" button the blog is shown in full', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Elias Vakkuri',
      user: { username: 'elias.vakkuri' },
      url: 'testurl',
      likes: 0
    }

    const blogs = []
    const setBlogsMock = jest.fn()

    const component = render(
      <Blog blog={blog} blogs={blogs} setBlogs={setBlogsMock} />
    )

    const button = component.getByText('Show more')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Likes'
    )

    expect(component.container).toHaveTextContent(
      'URL'
    )
  })

  test('clicking the "Like" button twice calls the event handler twice', async () => {
    const blog = {
      id: 1234,
      title: 'Component testing is done with react-testing-library',
      author: 'Elias Vakkuri',
      user: { username: 'elias.vakkuri' },
      url: 'testurl',
      likes: 0
    }

    const blogs = [blog]
    const setBlogsMock = jest.fn()
    const handleAddLike = jest.fn()

    const component = render(
      <Blog blog={blog} blogs={blogs} setBlogs={setBlogsMock} handleAddLike={handleAddLike} />
    )

    const showButton = component.getByText('Show more')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleAddLike.mock.calls).toHaveLength(2)
  })
})
