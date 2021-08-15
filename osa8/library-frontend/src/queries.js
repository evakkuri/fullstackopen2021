import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
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

export const UPDATE_BIRTH_YEAR = gql`
  mutation updateBirthYear(
    $authorName: String!, 
    $updatedBirthYear: Int!
  ) {
    editAuthorBirthYear(
      name: $authorName,
      setBornTo: $updatedBirthYear
    ) {
      name
      born
    }
  }
`
