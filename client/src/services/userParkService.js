import axios from 'axios'
const visitBaseUrl = '/api/visitedParks'
const planBaseUrl = '/api/plannedParks'


const getVisitedParks = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const result = await axios.get(visitBaseUrl, config)
  return result.data
}


const getPlannedParks = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const result = await axios.get(planBaseUrl, config)
  return result.data
}


export const getAllUserParks = async (token) => {
  const visitedParks = await getVisitedParks(token)
  const plannedParks = await getPlannedParks(token)
  return { visitedParks, plannedParks }
}