import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/authStore'

export default function JobDetail() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resume, setResume] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/jobs/${id}/`).then(r => { setJob(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!resume) return setError('Please upload your resume')
    setApplying(true); setError('')
    try {
      const fd = new FormData()
      fd.append('job', id); fd.append('resume', resume); fd.append('cover_letter', coverLetter)
      await api.post('/applications/apply/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setApplied(true); setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Already applied or error occurred')
    } finally { setApplying(false) }
  }

  if (loading) return <div style={{ paddingTop: 80, maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}><div className="skeleton" style={{ height: 300, borderRadius: 16 }} /></div>
  if (!job) return <div style={{ paddingTop: 80, textAlign: 'center', color: '#5a7a5a' }}>Job not found</div>

  const typeBadge = { full_time:'Full Time', part_time:'Part Time', internship:'Internship', contract:'Contract', remote:'Remote' }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#5a7a5a', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}>← Back to Jobs</button>

        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#15803d', fontFamily: 'Outfit', flexShrink: 0 }}>
                {job.company?.charAt(0)}
              </div>
              <div>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>{job.title}</h1>
                <p style={{ color: '#5a7a5a', fontWeight: 500, marginBottom: 12 }}>{job.company}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#5a7a5a' }}>
                  <span>📍 {job.location}</span>
                  <span>💼 {typeBadge[job.job_type]}</span>
                  <span>🎓 {job.experience === 'fresher' ? 'Fresher' : `${job.experience} years`}</span>
                  {job.salary_min && <span>💰 ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}</span>}
                </div>
              </div>
            </div>
            <div>
              {user?.role === 'seeker' && (applied
                ? <div style={{ padding: '12px 24px', borderRadius: 10, background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 14, fontWeight: 600 }}>✅ Applied Successfully</div>
                : <button onClick={() => { if (!user) navigate('/login'); else setShowForm(true) }} className="btn-primary" style={{ padding: '12px 28px', fontSize: 14, border: 'none', cursor: 'pointer' }}>Apply Now</button>
              )}
              {!user && <button onClick={() => navigate('/login')} className="btn-primary" style={{ padding: '12px 28px', fontSize: 14, border: 'none', cursor: 'pointer' }}>Login to Apply</button>}
            </div>
          </div>

          {job.skills_list?.length > 0 && (
            <div style={{ paddingTop: 20, borderTop: '1px solid #d8e8d8' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#5a7a5a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Required Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {job.skills_list.map((s, i) => <span key={i} style={{ fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 8, background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' }}>{s}</span>)}
              </div>
            </div>
          )}
        </div>

        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: '#0f1f0f', marginBottom: 16 }}>Job Description</h2>
          <p style={{ color: '#5a7a5a', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: 14 }}>{job.description}</p>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: '#0f1f0f', marginBottom: 16 }}>Requirements</h2>
          <p style={{ color: '#5a7a5a', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: 14 }}>{job.requirements}</p>
        </div>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
          <div className="card" style={{ padding: 32, width: '100%', maxWidth: 480 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: '#0f1f0f', marginBottom: 20 }}>Apply for {job.title}</h2>
            {error && <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>{error}</div>}
            <form onSubmit={handleApply}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>Resume (PDF / DOC)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} className="input-field" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>Cover Letter (optional)</label>
                <textarea rows={4} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="input-field" style={{ resize: 'none' }} placeholder="Tell them why you're the right fit..." />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline" style={{ flex: 1, padding: 12, fontSize: 14, cursor: 'pointer', background: 'white' }}>Cancel</button>
                <button type="submit" disabled={applying} className="btn-primary" style={{ flex: 1, padding: 12, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}