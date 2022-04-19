import axios from 'axios'

export const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export const signUp = async (credentials) => {
  const response = await axios.post('/api/users', credentials)
  return response.data
}