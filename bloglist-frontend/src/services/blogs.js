/* eslint-disable no-unused-vars */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newBlog) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const url = baseUrl + '/' + id
  const response = await axios.delete(url)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, deleteBlog }