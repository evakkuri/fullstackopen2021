const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
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

const jwtSecret = config.JWT_SECRET

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    findAuthorByName: Author
    me: User
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

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_parent, args) => {
      const books = await Book.find({}).populate('author')
      return books
        .filter((book) => args.author ? book.author.name === args.author : true)
        .filter((book) => args.genre ? book.genres.includes(args.genre) : true)
    },
    allAuthors: () => Author.find({}),
    findAuthorByName: (_parent, args) => Author.findOne({ name: args.name }),
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root })
      return authorBooks.length
    }
  },
  Mutation: {
    addBook: async (_parent, args, context) => {
      console.log(`Adding new book: ${JSON.stringify(args)}`)

      // Check current authentication
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("User not authenticated.")
      }

      //Create new book entry
      const newBookNoAuthor = { ...args }

      // If author is not yet known, add new author entry
      console.log("Searching author...")
      let author = await Author.findOne({
        name: args.author
      })

      if (!author) {
        author = new Author({
          name: args.author
        })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        console.log(`Added new author: ${author}`)
      }

      const newBook = new Book({
        ...newBookNoAuthor,
        author: author
      })

      // Add new book
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return newBook
    },

    editAuthorBirthYear: async (_parent, args, context) => {
      // Check current authentication
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("User not authenticated.")
      }

      const authorToEdit = await Author.findOne({ name: args.name })
      authorToEdit.born = args.setBornTo

      try {
        await authorToEdit.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return authorToEdit
    },

    createUser: async (_root, args) => {
      if (args.password.length < 3) {
        throw new UserInputError('Password needs to be at least 3 characters')
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({ 
        username: args.username, 
        passwordHash,
        favoriteGenre: args.favoriteGenre
      })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)

      if (!user || !passwordCorrect) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, jwtSecret) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), jwtSecret
      )

      const currentUser = await User
        .findById(decodedToken.id)
        .populate('friends')

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
