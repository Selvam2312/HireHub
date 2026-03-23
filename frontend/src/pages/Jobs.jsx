import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'

const jobTypes = ['','full_time','part_time','internship','contract','remote']
const jtLabels = {'':'All Types',full_time:'Full Time',part_time:'Part Time',internship:'Internship',contract:'Contract',remote:'Remote'}
const exps = ['','fresher','1-2','2-5','5+']
const expLabels = {'':'All Levels',fresher:'Fresher','1-2':'1-2 Yrs','2-5':'2-5 Yrs','5+':'5+ Yrs'}

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [jobType, setJobType] = useState('')
  const [experience, setExperience] = useState('')
  const [count, setCount] = useState(0)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (jobType) params.append('job_type', jobType)
      if (experience) params.append('experience', experience)
      const { data } = await api.get(`/jobs/?${params}`)
      const results = data.results || data
      setJobs(results); setCount(data.count || results.length)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => {
    const t = setTimeout(fetchJobs, 300)
    return () => clearTimeout(t)
  }, [search, jobType, experience])

  const selectStyle = { padding: '10px 16px', borderRadius: 10, border: '1.5px solid #d8e8d8', fontSize: 13, fontWeight: 500, color: '#0f1f0f', background: 'white', outline: 'none', cursor: 'pointer' }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8d8', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>Browse Jobs</h1>
          <p style={{ color: '#5a7a5a', fontSize: 14, marginBottom: 24 }}>{count} opportunities available</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input type="text" placeholder="Search jobs, skills, companies..." value={search} onChange={e => setSearch(e.target.value)}
              className="input-field" style={{ flex: 1, minWidth: 240, margin: 0 }} />
            <select value={jobType} onChange={e => setJobType(e.target.value)} style={selectStyle}>
              {jobTypes.map(t => <option key={t} value={t}>{jtLabels[t]}</option>)}
            </select>
            <select value={experience} onChange={e => setExperience(e.target.value)} style={selectStyle}>
              {exps.map(e => <option key={e} value={e}>{expLabels[e]}</option>)}
            </select>
            {(search || jobType || experience) && (
              <button onClick={() => { setSearch(''); setJobType(''); setExperience('') }}
                style={{ padding: '10px 16px', borderRadius: 10, border: '1.5px solid #fca5a5', background: 'white', color: '#dc2626', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clear</button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="card" style={{ padding: 24, height: 240 }}>
                <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 12, width: '100%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 12, width: '60%' }} />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: '#0f1f0f', marginBottom: 8 }}>No jobs found</h3>
            <p style={{ color: '#5a7a5a', fontSize: 14 }}>Try different search terms or filters</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  )
}