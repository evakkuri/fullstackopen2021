import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form } from 'semantic-ui-react'

import { ALL_BOOKS } from '../queries'

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!, 
    $author: String!, 
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Input
          label='Book title'
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Input
          label='Author'
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Input
          type='number'
          label='Published'
          placeholder='2021'
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <Form.TextArea
          label='Genres'
          placeholder='Input book genres separated by space, e.g. "suspense action", then click "Add genre"'
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <Form.Button onClick={addGenre} type="button">Add genre</Form.Button>
        <p>
          <i>Genres:</i> {genres.join(' ')}
        </p>
        <Form.Button primary type='submit'>Create book</Form.Button>
      </Form>
    </div>
  )
}

export default NewBook
