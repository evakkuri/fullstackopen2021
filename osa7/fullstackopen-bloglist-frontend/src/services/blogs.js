import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newBlog) => {
  console.log(`Sending request to update blog ${id} to ${JSON.stringify(newBlog)}`)

  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  console.log(response.status)
  console.log(response.data)

  if (response.status === 200) {
    console.log(`Successfully updated blog ${id}`)
  }

  return response
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(`Deleting blog ${id}...`)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.status)
  return response
}

const exports = { getAll, create, update, remove, setToken }
export default exports