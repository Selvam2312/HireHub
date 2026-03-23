import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/authStore'

const statusOptions = ['pending','reviewed','shortlisted','rejected','hired']
const statusStyle = {
  pending: { bg: '#fef9c3', color: '#854d0e' },
  reviewed: { bg: '#dbeafe', color: '#1e40af' },
  shortlisted: { bg: '#dcfce7', color: '#15803d' },
  rejected: { bg: '#fee2e2', color: '#991b1b' },
  hired: { bg: '#f3e8ff', color: '#6b21a8' },
}

export default function EmployerDashboard() {
  const { user } = useAuthStore()
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/jobs/my-jobs/').then(r => {
      const list = r.data.results || r.data
      setJobs(list); if (list.length > 0) setSelectedJob(list[0]); setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedJob) return
    api.get(`/applications/job/${selectedJob.id}/`).then(r => setApplicants(r.data.results || r.data))
  }, [selectedJob])

  const updateStatus = async (appId, status) => {
    await api.patch(`/applications/${appId}/status/`, { status })
    setApplicants(prev => prev.map(a => a.id === appId ? {...a, status} : a))
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8d8', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>Employer Dashboard</h1>
            <p style={{ color: '#5a7a5a', fontSize: 14 }}>Welcome, {user?.full_name?.split(' ')[0]}! 🏢</p>
          </div>
          <Link to="/employer/post-job" className="btn-primary" style={{ padding: '12px 24px', fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>+ Post a Job</Link>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📋', value: jobs.length, label: 'Jobs Posted', bg: '#dcfce7', color: '#15803d' },
            { icon: '👥', value: jobs.reduce((s,j) => s+(j.applicant_count||0),0), label: 'Total Applicants', bg: '#dbeafe', color: '#1e40af' },
            { icon: '✅', value: applicants.filter(a => a.status==='hired').length, label: 'Hired', bg: '#f3e8ff', color: '#6b21a8' },
          ].map((s,i) => (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#5a7a5a', fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20, height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: '#0f1f0f', marginBottom: 16 }}>My Jobs</h2>
            {loading ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8 }} />)}</div>
            : jobs.length === 0 ? <div style={{ textAlign: 'center', padding: '24px 0' }}><p style={{ color: '#5a7a5a', fontSize: 13, marginBottom: 12 }}>No jobs posted</p><Link to="/employer/post-job" style={{ color: '#16a34a', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Post first job →</Link></div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {jobs.map(job => (
                  <button key={job.id} onClick={() => setSelectedJob(job)}
                    style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: selectedJob?.id === job.id ? '1.5px solid #16a34a' : '1px solid #d8e8d8', background: selectedJob?.id === job.id ? '#dcfce7' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 2 }}>{job.title}</p>
                    <p style={{ fontSize: 11, color: '#5a7a5a' }}>{job.applicant_count} applicants</p>
                  </button>
                ))}
              </div>}
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: '#0f1f0f', marginBottom: 20 }}>
              {selectedJob ? `Applicants — ${selectedJob.title}` : 'Select a job'}
            </h2>
            {applicants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>👥</div>
                <p style={{ color: '#5a7a5a', fontSize: 14 }}>No applicants yet for this job</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {applicants.map(app => {
                  const s = statusStyle[app.status] || statusStyle.pending
                  return (
                    <div key={app.id} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid #d8e8d8', background: '#f8faf8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#15803d', fontSize: 14, flexShrink: 0 }}>
                            {app.applicant_name?.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: 14, color: '#0f1f0f', marginBottom: 2 }}>{app.applicant_name}</p>
                            <p style={{ fontSize: 12, color: '#5a7a5a' }}>{app.applicant_email}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <a href={`http://localhost:8000${app.resume}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#16a34a', textDecoration: 'none' }}>View Resume ↗</a>
                          <select value={app.status} onChange={e => updateStatus(app.id, e.target.value)}
                            style={{ padding: '5px 10px', borderRadius: 8, border: `1.5px solid ${s.color}`, background: s.bg, color: s.color, fontSize: 12, fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
                            {statusOptions.map(o => <option key={o} value={o} style={{ background: 'white', color: '#0f1f0f' }}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
                          </select>
                        </div>
                      </div>
                      {app.cover_letter && <p style={{ marginTop: 10, fontSize: 12, color: '#5a7a5a', borderTop: '1px solid #d8e8d8', paddingTop: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{app.cover_letter}</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}