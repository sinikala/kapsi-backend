import axios from 'axios'
const baseUrl = '/api/notes'


export const getUserNotes = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const result = await axios.get(baseUrl, config)
  return result.data
}