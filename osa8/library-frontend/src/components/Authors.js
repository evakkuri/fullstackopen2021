import React from 'react'
import { useQuery } from '@apollo/client'
import { Table } from 'semantic-ui-react'

import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

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
    </div>
  )
}

export default Authors