import React from 'react'
import { useSelector } from 'react-redux'
import './UserList.css'

const UserInfo = ({ user }) => {
  console.log(user)
  const numBlogs = user.blogs.length
  console.log(numBlogs)

  return (
    <tr>
      <td>{user.name}</td>
      <td>{numBlogs}</td>
    </tr>
  )
}

const UserList = () => {
  const users = useSelector(state => state.users)

  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <table>
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