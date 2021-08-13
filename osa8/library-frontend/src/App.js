import React, { useState } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  //const [errorMessage, setErrorMessage] = useState(null)

  const menuStyle = {
    padding: '10px',
    backgroundColor: 'black'
  }

  return (
    <div className="App">

      <Menu inverted secondary style={menuStyle}>
        <Container>
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
            <Button inverted
              onClick={() => setPage('add')}
            >Add book</Button>
          </Menu.Menu>
        </Container>
      </Menu>

      <Container>
        <div style={{ marginTop: '30px' }}>
          <Authors show={page === 'authors'} />
          <Books show={page === 'books'} />
          <NewBook show={page === 'add'}/>
        </div>
      </Container>
    </div>
  )
}

export default App
