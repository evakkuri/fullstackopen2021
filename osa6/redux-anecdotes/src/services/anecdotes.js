import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
  const object = { id: getId(), content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const currAnecdote = await (await axios.get(`${baseUrl}/${id}`)).data
  const updatedAnecdote = { ...currAnecdote, votes: currAnecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

const exports = { getAll, createNew, addVote }
export default exports
