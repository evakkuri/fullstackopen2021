import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './UserList.css'

const getUserIdField = ({ id, name }) => {
  return [id, name.replace(/\s+/g, '').toLowerCase()].join('-')
}

const UserInfo = ({ user }) => {
  if (!user) { return null }

  console.log(user)
  const numBlogs = user.blogs.length
  console.log(numBlogs)

  return (
    <tr>
      <td id={[getUserIdField(user), 'field', 'name'].join('-')}>
        <Link to={`users/${user.id}`}>{user.name}</Link></td>
      <td id={[getUserIdField(user), 'field', 'numBlogs'].join('-')}>{numBlogs}</td>
    </tr>
  )
}

const UserList = () => {
  const users = useSelector(state => state.users)

  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <table id='users-table'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <UserInfo key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  )
}

export default UserList