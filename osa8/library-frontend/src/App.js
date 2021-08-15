import React, { useState } from 'react'
import { Button, Container, Menu, Message, Transition } from 'semantic-ui-react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const menuStyle = {
    padding: '10px',
    backgroundColor: 'black'
  }

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const notifySuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
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
        <div>
          <Transition visible={errorMessage ? true : false} animation='fade right'>
            <Message error display={errorMessage}>{errorMessage}</Message>
          </Transition>
          <Transition visible={successMessage ? true : false} animation='fade right'>
            <Message success display={successMessage}>{successMessage}</Message>
          </Transition>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Authors show={page === 'authors'} />
          <Books show={page === 'books'} />
          <NewBook
            show={page === 'add'}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
        </div>
      </Container>
    </div>
  )
}

export default App
