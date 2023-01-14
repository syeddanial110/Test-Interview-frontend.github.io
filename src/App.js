import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import pathLocations from './utils/pathLocations'
import ProtectedRoute from './helpers/ProtectedRoute'
import Creator from './pages/Creator'

function App() {
  const path = pathLocations
  return (
    <Router>
      <Routes>
        <Route path={path.login} element={<Login />} />
        <Route
          path={path.admin}
          element={<ProtectedRoute component={Admin} />}
        />
        <Route
          path={path.creator}
          element={<ProtectedRoute component={Creator} />}
        />
      </Routes>
    </Router>
  )
}

export default App
