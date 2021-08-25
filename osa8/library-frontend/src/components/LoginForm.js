import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Form, Grid, Container, Message } from 'semantic-ui-react'

import { LOGIN, CURRENT_USER } from '../queries'

const LoginForm = ({ show, token, setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  const currentUser = useQuery(CURRENT_USER)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  if (token) return (
    <Container>
      <h2>User information</h2>
      <p><b>Username:</b> {currentUser.data ? currentUser.data.me.username : ''}</p>
      <p><b>Favorite genre:</b> {currentUser.data ? currentUser.data.me.favoriteGenre : ''}</p>
    </Container>
  )

  const submit = async (event) => {
    event.preventDefault()

    const loginResult = await login({ variables: { username, password } })

    if (loginResult.data) {
      setErrorMessage(null)
      setUsername('')
      setPassword('')
    }   
  }

  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form error onSubmit={submit}>
              <Form.Input
                label={'Username'}
                placeholder={'Username'}
                value={username || ''}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Input
                type='password'
                label={'Password'}
                placeholder={'Password'}
                value={password || ''}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Message
                hidden={!errorMessage ? true : false}
                error
                header={'Error'}
                content={errorMessage}
              />
              <Form.Button primary type='submit'>Login</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default LoginForm