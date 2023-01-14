import pathLocations from "./pathLocations"

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}
export const autoLogout = () => {
  removeToken()
  window.location.href = pathLocations.login
}
