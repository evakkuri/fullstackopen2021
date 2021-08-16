import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Form, Grid } from 'semantic-ui-react'

import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'

const Authors = (props) => {
  const [authorNameInput, setAuthorNameInput] = useState(null)
  const [authorBirthYearInput, setAuthorBirthYearInput] = useState(null)

  const authors = useQuery(ALL_AUTHORS)

  console.log(authors)

  const [updateBirthYear] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  const submitForm = async (event) => {
    event.preventDefault()

    try {
      const updatedAuthor = await updateBirthYear({
        variables: {
          authorName: authorNameInput,
          updatedBirthYear:
            Number(authorBirthYearInput)
              ? Number(authorBirthYearInput)
              : null
        }
      })
      if (updatedAuthor.data) return updatedAuthor.data.editAuthorBirthYear
      return null
    } catch (e) {
      console.log(e)
    }
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <Table celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Born</Table.HeaderCell>
            <Table.HeaderCell>Books</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {authors.data.allAuthors.map(a =>
            <Table.Row key={a.name}>
              <Table.Cell>{a.name}</Table.Cell>
              <Table.Cell>{a.born}</Table.Cell>
              <Table.Cell>{a.bookCount}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div>
        <h3>Edit author's birth year</h3>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={submitForm}>
                <Form.Select
                  search
                  label='Name'
                  placeholder='Name'
                  options={authors.data.allAuthors.map((a) => ({
                    key: a.name,
                    text: a.name,
                    value: a.name
                  }))}
                  value={authorNameInput ? authorNameInput : ''}
                  onChange={(_event, data) => setAuthorNameInput(data.value)}
                />
                <Form.Input
                  label='New birth year'
                  type='number'
                  placeholder='1970'
                  value={authorBirthYearInput ? authorBirthYearInput : ''}
                  onChange={({ target }) => setAuthorBirthYearInput(target.value)}
                />
                <Form.Button primary type='submit'>Update</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

export default Authors