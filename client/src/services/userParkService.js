import axios from 'axios'
const visitBaseUrl = '/api/visitedParks'
const planBaseUrl = '/api/plannedParks'


// GET
export const getAllUserParks = async (token) => {
  const visitedParks = await getVisitedParks(token)
  const plannedParks = await getPlannedParks(token)
  return { visitedParks, plannedParks }
}


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


// POST

export const savePlan = async (newPlan, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(planBaseUrl, newPlan, config)
  return response.data
}