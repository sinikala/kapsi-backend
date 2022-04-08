import axios from 'axios'
const baseUrl = '/api/parks'

export const getAll = () => {
  return axios.get(baseUrl)
}




