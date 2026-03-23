import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10,
  border: '1.5px solid #d8e8d8', fontSize: 14, outline: 'none',
  fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0f1f0f',
  background: 'white', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

const labelStyle = {
  fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block'
}

const sectionTitleStyle = {
  fontSize: 11, fontWeight: 700, color: '#5a7a5a',
  textTransform: 'uppercase', letterSpacing: '0.8px',
  marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #d8e8d8'
}

export default function PostJob() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '', company: '', location: '', job_type: 'full_time',
    experience: 'fresher', salary_min: '', salary_max: '',
    description: '', requirements: '', skills: '', deadline: ''
  })

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/jobs/', form)
      navigate('/employer/dashboard')
    } catch {
      setError('Failed to post job. Please check all fields.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8d8', padding: '32px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>Post a Job</h1>
          <p style={{ color: '#5a7a5a', fontSize: 14 }}>Fill in the details to attract top candidates</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: 'white', border: '1px solid #d8e8d8', borderRadius: 16, padding: 36 }}>
          {error && (
            <div style={{ marginBottom: 20, padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Basic Info */}
            <div style={{ marginBottom: 28 }}>
              <div style={sectionTitleStyle}>Basic Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Job Title *</label>
                  <input
                    type="text" required
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company Name *</label>
                  <input
                    type="text" required
                    value={form.company}
                    onChange={e => set('company', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. TechCorp India"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Location *</label>
                  <input
                    type="text" required
                    value={form.location}
                    onChange={e => set('location', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Chennai, TN"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Application Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={e => set('deadline', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div style={{ marginBottom: 28 }}>
              <div style={sectionTitleStyle}>Job Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Job Type *</label>
                  <select
                    value={form.job_type}
                    onChange={e => set('job_type', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Experience Level *</label>
                  <select
                    value={form.experience}
                    onChange={e => set('experience', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="fresher">Fresher</option>
                    <option value="1-2">1-2 Years</option>
                    <option value="2-5">2-5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Min Salary (₹/yr)</label>
                  <input
                    type="number"
                    value={form.salary_min}
                    onChange={e => set('salary_min', e.target.value)}
                    style={inputStyle}
                    placeholder="300000"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Max Salary (₹/yr)</label>
                  <input
                    type="number"
                    value={form.salary_max}
                    onChange={e => set('salary_max', e.target.value)}
                    style={inputStyle}
                    placeholder="600000"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Description */}
            <div style={{ marginBottom: 28 }}>
              <div style={sectionTitleStyle}>Skills & Description</div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Required Skills *</label>
                <input
                  type="text" required
                  value={form.skills}
                  onChange={e => set('skills', e.target.value)}
                  style={inputStyle}
                  placeholder="React, Python, Django (comma separated)"
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Job Description *</label>
                <textarea
                  required rows={5}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Describe the role, responsibilities..."
                />
              </div>
              <div>
                <label style={labelStyle}>Requirements *</label>
                <textarea
                  required rows={4}
                  value={form.requirements}
                  onChange={e => set('requirements', e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="List must-have qualifications..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{ flex: 1, padding: 13, fontSize: 14, cursor: 'pointer', borderRadius: 10, border: '1.5px solid #16a34a', background: 'white', color: '#16a34a', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{ flex: 1, padding: 13, fontSize: 14, cursor: 'pointer', borderRadius: 10, border: 'none', background: '#16a34a', color: 'white', fontWeight: 600, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}