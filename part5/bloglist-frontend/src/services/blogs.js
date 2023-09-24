import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const userAuthorization = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, userAuthorization)
  return res.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const update = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return res.data
}

export default { getAll, create, update, setToken }
