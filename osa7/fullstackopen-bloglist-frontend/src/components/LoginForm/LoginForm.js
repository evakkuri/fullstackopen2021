import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './LoginForm.css'
import { login } from '../../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'
//import { Button } from '../../styled'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password)

    dispatch(login(username, password))
  }

  return (
    <div>
      <h2>Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
