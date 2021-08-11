import React, { useState } from 'react'
import { Container, Menu } from 'semantic-ui-react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div className="App">
      <Container>
        <Menu secondary>
          <Menu.Item
            name='Authors'
            active={page === 'authors'}
            onClick={() => setPage('authors')}
          />
          <Menu.Item
            name='Books'
            active={page === 'books'}
            onClick={() => setPage('books')}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='Add book'
              active={page === 'add'}
              onClick={() => setPage('add')}
            />
          </Menu.Menu>
        </Menu>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />

        <NewBook
          show={page === 'add'}
        />
      </Container>
    </div>
  )
}

export default App
