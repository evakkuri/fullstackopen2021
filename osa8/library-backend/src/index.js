const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

console.log('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: String!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allBooksParametrized(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthorBirthYear(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}).populate('author'),
    allBooksParametrized: (parent, args) => {
      return books
        .filter((book) => args.author ? book.author === args.author : true)
        .filter((book) => args.genre ? book.genres.includes(args.genre) : true)
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length
  },
  Mutation: {
    addBook: (parent, args) => {
      // Check that book with same title does not exist yet
      if (books.find((book) => book.title === args.title)) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.name,
        })
      }

      // If author is not yet known, add new author entry
      if (!authors.find((a) => a.name === args.author)) {
        const newAuthor = {
          id: uuid(),
          name: args.author
        }
        authors = authors.concat(newAuthor)
      }

      // Add new book
      const newBook = { ...args, id: uuid() }
      books = books.concat(newBook)
      return newBook
    },
    editAuthorBirthYear: (parent, args) => {
      const authorToEdit = authors.find((a) => a.name === args.name)
      if (!authorToEdit) return null

      const updatedAuthor = { ...authorToEdit, born: args.setBornTo }
      authors = authors.map(
        (a) => a.name === authorToEdit.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
