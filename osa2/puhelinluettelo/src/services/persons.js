import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createPerson = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const updatePerson = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

const personsService = { getAllPersons, createPerson, updatePerson, deletePerson }

export default personsService