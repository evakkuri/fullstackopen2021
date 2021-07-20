import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './LoginForm.css'
import { login } from '../../reducers/loginReducer'

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
      <form onSubmit={handleLogin}>
        <div className='loginform-wrapper'>
          User name
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='loginform-wrapper'>
          Password
          <input
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm