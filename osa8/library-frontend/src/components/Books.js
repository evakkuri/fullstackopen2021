import React from 'react'
import { useQuery } from '@apollo/client'
import { Table } from 'semantic-ui-react'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>
      <Table celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Published</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books.data.allBooks.map(a =>
            <Table.Row key={a.title}>
              <Table.Cell>{a.title}</Table.Cell>
              <Table.Cell>{a.author}</Table.Cell>
              <Table.Cell>{a.published}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Books