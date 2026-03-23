import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Register() {
  const { register, loading, error } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ full_name: '', email: '', password: '', role: 'seeker' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await register(form)
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/dashboard')
    } catch {}
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#f8faf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }} className="fade-up">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: 'white' }}>H</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 6 }}>Create Account</h1>
          <p style={{ color: '#5a7a5a', fontSize: 14 }}>Join HireHub and start your journey</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          {error && <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>Something went wrong. Try again.</div>}

          <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #d8e8d8', marginBottom: 24 }}>
            {['seeker','employer'].map(role => (
              <button key={role} type="button" onClick={() => setForm({...form, role})}
                style={{ flex: 1, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: form.role === role ? '#16a34a' : 'white', color: form.role === role ? 'white' : '#5a7a5a', transition: 'all 0.2s' }}>
                {role === 'seeker' ? '🔍 Job Seeker' : '🏢 Employer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { label: 'Full Name', key: 'full_name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 6 characters' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>{f.label}</label>
                <input type={f.type} required value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="input-field" placeholder={f.placeholder} />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15, border: 'none', cursor: 'pointer', marginTop: 8 }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a5a', marginTop: 20 }}>
            Already have an account? <Link to="/login" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}