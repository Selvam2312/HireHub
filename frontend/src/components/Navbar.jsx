import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (path) => location.pathname === path

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #d8e8d8', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16, fontFamily: 'Outfit, sans-serif' }}>H</span>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#0f1f0f' }}>
            Hire<span style={{ color: '#16a34a' }}>Hub</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {[
            { path: '/jobs', label: 'Browse Jobs', show: true },
            { path: '/dashboard', label: 'My Applications', show: user?.role === 'seeker' },
            { path: '/employer/dashboard', label: 'Dashboard', show: user?.role === 'employer' },
            { path: '/employer/post-job', label: 'Post a Job', show: user?.role === 'employer' },
          ].filter(n => n.show).map(n => (
            <Link key={n.path} to={n.path} style={{ textDecoration: 'none', fontSize: 14, fontWeight: 500, color: isActive(n.path) ? '#16a34a' : '#5a7a5a', borderBottom: isActive(n.path) ? '2px solid #16a34a' : '2px solid transparent', paddingBottom: 2, transition: 'all 0.2s' }}>
              {n.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '6px 12px', borderRadius: 8, border: '1px solid #d8e8d8' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>
                  {user.full_name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f' }}>{user.full_name?.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #fca5a5', background: 'white', color: '#dc2626', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: '#5a7a5a', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}