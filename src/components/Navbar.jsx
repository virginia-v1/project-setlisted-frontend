import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Logo from './Logo'

export default function Navbar() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) return null

  return (
    <nav className="navbar">
      
      <div className="logo-container" onClick={() => navigate('/events')} style={{ cursor: 'pointer' }}>
        <Logo />
      </div>

      <div className="navbar-links">
        <NavLink
          to="/events"
          className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}
        >
          Browse
        </NavLink>
        <NavLink
          to="/my-list"
          className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}
        >
          My list
        </NavLink>
        <div className="navbar-avatar" onClick={() => navigate('/user')}>
          {user.username?.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  )
}