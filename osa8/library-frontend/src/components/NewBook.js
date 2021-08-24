import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Label, Icon } from 'semantic-ui-react'

import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [published, setPublished] = useState(null)
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      if (error.networkError && error.networkError.result.errors) {
        props.notifyError(
          <div>
            <p>Errors in input values:</p>
            <ul>
              {error.networkError.result.errors.map(
                (e, i) => <li key={i}>{e.message}</li>)
              }
            </ul>
          </div>
        )
      }

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        props.notifyError(
          `Error creating new book entry: ${JSON.stringify(error.graphQLErrors[0].message)}`
        )
      }
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const newBookVars = {
      title: title ? title : null,
      author: author ? author : null,
      published: Number(published) ? Number(published) : null,
      genres: genres.length > 0 ? genres : null
    }

    try {
      const newBook = await createBook({
        variables: newBookVars
      })

      if (newBook.data) {
        const title = newBook.data.addBook.title
        const author = newBook.data.addBook.author
        props.notifySuccess(
          `Successfully created new book "${title}" by ${author.name}`)

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
      }

    } catch (e) {
      console.log("Submit error handler")
      console.log(e)
    }
  }

  const addGenre = () => {
    const genresToAdd = genre
      .split(',')
      .map(genreToAdd => genreToAdd.trim())
      .filter(genreToAdd => !genres.includes(genreToAdd))

    setGenres(genres.concat(genresToAdd))
    setGenre('')
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Input
          label='Book title'
          placeholder='Title'
          value={title || ''}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Input
          label='Author'
          placeholder='Author'
          value={author || ''}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Input
          type='number'
          label='Published'
          placeholder='2021'
          value={published || ''}
          onChange={({ target }) => setPublished(target.value)}
        />
        <Form.TextArea
          label='Genres'
          placeholder='Input book genres separated by comma, e.g. "suspense, action", then click "Add genre"'
          value={genre || ''}
          onChange={({ target }) => setGenre(target.value)}
        />
        <Form.Button onClick={addGenre} type="button">Add genre</Form.Button>
        <div>
          <i>Genres: </i>
          {genres.map((genre) => {
            return (
              <Label key={genre}>
                {genre}
                <Icon
                  name='delete'
                  onClick={() => setGenres(genres
                    .filter(setGenre => setGenre !== genre))} />
              </Label>
            )
          })}
        </div>
        <Form.Button primary type='submit' style={{ marginTop: 15 }}>Create book</Form.Button>
      </Form>
    </div>
  )
}

export default NewBook
