import axios from 'axios'
const visitBaseUrl = '/api/visitedParks'
const planBaseUrl = '/api/plannedParks'
const routesBaseUrl = '/api/routes'


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

export const createPlan = async (newPlan, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(planBaseUrl, newPlan, config)
  return response.data
}


export const createVisit = async (newVisit, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(visitBaseUrl, newVisit, config)
  return response.data
}


export const createRoute = async (route, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(routesBaseUrl, route, config)
  return response.data
}

// PUT

export const addVisitComment = async (visitId, comment, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.put(`${visitBaseUrl}/comment/${visitId}`, comment, config)
  return response.data
}
