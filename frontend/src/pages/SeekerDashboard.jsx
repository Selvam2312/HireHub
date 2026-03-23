import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/authStore'

const statusStyle = {
  pending: { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
  reviewed: { bg: '#dbeafe', color: '#1e40af', label: 'Reviewed' },
  shortlisted: { bg: '#dcfce7', color: '#15803d', label: 'Shortlisted' },
  rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
  hired: { bg: '#f3e8ff', color: '#6b21a8', label: 'Hired' },
}

export default function SeekerDashboard() {
  const { user } = useAuthStore()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/applications/my/').then(r => { setApps(r.data.results || r.data); setLoading(false) })
  }, [])

  const stats = [
    { label: 'Total Applied', value: apps.length, icon: '📋', bg: '#dcfce7', color: '#15803d' },
    { label: 'Shortlisted', value: apps.filter(a => a.status === 'shortlisted').length, icon: '⭐', bg: '#dbeafe', color: '#1e40af' },
    { label: 'Hired', value: apps.filter(a => a.status === 'hired').length, icon: '🎉', bg: '#f3e8ff', color: '#6b21a8' },
    { label: 'Pending', value: apps.filter(a => a.status === 'pending').length, icon: '⏳', bg: '#fef9c3', color: '#854d0e' },
  ]

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8d8', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>My Dashboard</h1>
          <p style={{ color: '#5a7a5a', fontSize: 14 }}>Welcome back, {user?.full_name?.split(' ')[0]}! 👋</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#5a7a5a', fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: '#0f1f0f' }}>My Applications</h2>
            <Link to="/jobs" style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>Browse more jobs →</Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 10 }} />)}</div>
          ) : apps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '56px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <h3 style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: '#0f1f0f', marginBottom: 6 }}>No applications yet</h3>
              <p style={{ color: '#5a7a5a', fontSize: 14, marginBottom: 20 }}>Start applying to jobs that match your skills</p>
              <Link to="/jobs" className="btn-primary" style={{ padding: '12px 28px', fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>Browse Jobs</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {apps.map(app => {
                const s = statusStyle[app.status] || statusStyle.pending
                return (
                  <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 10, background: '#f8faf8', border: '1px solid #d8e8d8', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#15803d', fontFamily: 'Outfit', flexShrink: 0 }}>
                        {app.job_detail?.company?.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 14, color: '#0f1f0f', marginBottom: 2 }}>{app.job_detail?.title}</p>
                        <p style={{ fontSize: 12, color: '#5a7a5a' }}>{app.job_detail?.company} • {app.job_detail?.location}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: '#5a7a5a' }}>{new Date(app.applied_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      <span className="badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}