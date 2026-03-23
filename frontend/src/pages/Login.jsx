import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Login() {
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/dashboard')
    } catch {}
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#f8faf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }} className="fade-up">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: 'white' }}>H</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 6 }}>Welcome Back</h1>
          <p style={{ color: '#5a7a5a', fontSize: 14 }}>Sign in to your HireHub account</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          {error && <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>{typeof error === 'string' ? error : 'Invalid credentials'}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>Password</label>
              <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15, border: 'none', cursor: 'pointer' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a5a', marginTop: 20 }}>
            Don't have an account? <Link to="/register" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}