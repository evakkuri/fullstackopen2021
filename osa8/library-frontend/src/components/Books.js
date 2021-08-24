import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Table, Label, Menu, Button, Icon } from 'semantic-ui-react'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([])

  const books = useQuery(ALL_BOOKS)
  const genres = books.data
    ? [...new Set(
      books.data.allBooks
        .map(b => b.genres)
        .flat())]
    : null

  const genreFilterClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
      return
    }

    setSelectedGenres(selectedGenres.concat(genre))
  }

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>
      <Menu stackable size='tiny' secondary>
        <Menu.Item header>Filter by</Menu.Item>
        {genres.map((genre) => {
          return (
            <Menu.Item key={genre}>
              <Button
                size='tiny'
                icon
                labelPosition='right'
                onClick={() => genreFilterClick(genre)}
              >
                {genre}
                {selectedGenres.includes(genre)
                  ? <Icon name='check circle outline' />
                  : <Icon name='circle outline' />}
              </Button>
            </Menu.Item>
          )
        })}
      </Menu>
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
          {books.data.allBooks
            .filter(book => {
              if (selectedGenres.length === 0) return true
              return book.genres.some(genre => selectedGenres.includes(genre))
            })
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
    </div >
  )
}

export default Books