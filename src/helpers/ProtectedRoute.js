import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import pathLocations from '../utils/pathLocations'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const useAuth = () => {
  const isLoggedIn2 = true
  //   const isLoggedIn2 = isLoggedIn()
  //     return isLoggedIn
  // }
  // const isAuth= useAuth()

  //validate token
  // debugger;

  const path = pathLocations

  return isLoggedIn2 ? <Component /> : <Navigate to={path.login} />
}

export default ProtectedRoute
