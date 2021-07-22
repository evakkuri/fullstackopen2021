import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../reducers/loginReducer'

const Menu = () => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  const padding = {
    paddingRight: 6,
    paddingTop: 2
  }
  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <Link style={padding} to='/'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
      {login === null
        ? null
        : <text>{login.name} is logged in <button id='logout' onClick={handleLogout}>Log out</button></text>
      }
    </div>
  )
}

export default Menu
