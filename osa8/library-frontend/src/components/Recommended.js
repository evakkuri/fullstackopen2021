import React from 'react'
import { useQuery } from '@apollo/client'
import { Table, Label } from 'semantic-ui-react'

import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommended = (props) => {
  const currentUser = useQuery(CURRENT_USER)

  const favoriteGenre = currentUser.data
    ? currentUser.data.me.favoriteGenre
    : ''

  const booksResponse = useQuery(ALL_BOOKS, {
    variables: { genres: [favoriteGenre] }
  })

  const books = booksResponse.data
    ? booksResponse.data.allBooks
    : []

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommended</h2>
      <p>Recommended books with your favorite genre: <b>{favoriteGenre}</b></p>
      <Table celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Published</Table.HeaderCell>
            <Table.HeaderCell>Genres</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books
            .map(a =>
              <Table.Row key={a.title}>
                <Table.Cell>{a.title}</Table.Cell>
                <Table.Cell>{a.author.name}</Table.Cell>
                <Table.Cell>{a.published}</Table.Cell>
                <Table.Cell>
                  {a.genres
                    .map((genre) => {
                      return (
                        <Label key={genre}>
                          {genre}
                        </Label>
                      )
                    })}
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Recommended
