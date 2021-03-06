import React, { useState, useEffect } from 'react'
import { Button, Container, Menu, Message, Transition, Dropdown } from 'semantic-ui-react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/LoginForm'
import Recommended from './components/Recommended'

const LoginMenuItem = ({ token, setPage, setToken, apolloClient }) => {
  if (!token) {
    return (
      <Button onClick={() => setPage('login')}>
        Log in
      </Button>
    )
  }

  const logOutClick = () => {
    localStorage.clear()
    apolloClient.resetStore()
    setToken(null)
    setPage('login')
  }

  return (
    <Dropdown
      icon={{name: 'user circle', fitted: true}}
      item
    >
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setPage('login')}>
          User information
        </Dropdown.Item>
        <Dropdown.Item onClick={logOutClick}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const loggedInUserToken = window.localStorage.getItem('library-user-token')
    if (loggedInUserToken) {
      setToken(loggedInUserToken)
    }
  }, [setToken])

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
          <Menu.Item
            name='Recommended'
            active={page === 'recommended'}
            onClick={() => setPage('recommended')}
          />
          <Menu.Menu position='right'>
            <Button
              inverted
              disabled={token ? false : true}
              onClick={() => setPage('add')}>
              Add book
            </Button>
            <LoginMenuItem
              token={token}
              setToken={setToken}
              setPage={setPage}
              apolloClient={client}
            />
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
          <Authors show={page === 'authors'} loggedIn={token ? true : false} />
          <Books show={page === 'books'} />
          <Recommended show={page === 'recommended'} />
          <NewBook
            show={page === 'add'}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
          <Login
            show={page === 'login'}
            token={token}
            setToken={setToken}
          />
        </div>
      </Container>
    </div>
  )
}

export default App
