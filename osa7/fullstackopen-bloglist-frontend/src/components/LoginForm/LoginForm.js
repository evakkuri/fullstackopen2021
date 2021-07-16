import PropTypes from 'prop-types'

import React from 'react'
import './LoginForm.css'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={handleSubmit}>
        <div className='loginform-wrapper'>
          User name
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='loginform-wrapper'>
          Password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm