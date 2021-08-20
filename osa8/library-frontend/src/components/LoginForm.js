import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Grid, Container } from 'semantic-ui-react'

import { LOGIN } from '../queries'

const LoginForm = ({ show, setError, token, setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

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
      <h3>User logged in</h3>
      <p>Token: {token.slice(0, 10)}...</p>
    </Container>
  )

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={submit}>
              <Form.Input
                label={'Username'}
                placeholder={'Username'}
                value={username || ''}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Input
                label={'Password'}
                placeholder={'Password'}
                value={password || ''}
                onChange={({ target }) => setPassword(target.value)}
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