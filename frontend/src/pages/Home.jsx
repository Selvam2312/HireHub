import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'

export default function Home() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    api.get('/jobs/').then(r => setJobs(r.data.results?.slice(0,6) || r.data.slice(0,6))).catch(() => {})
  }, [])

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      {/* Hero */}
      <section style={{ background: 'white', borderBottom: '1px solid #d8e8d8' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            India's Fastest Growing Job Platform
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, color: '#0f1f0f', lineHeight: 1.1, marginBottom: 20 }}>
            Find Your <span style={{ color: '#16a34a' }}>Dream Job</span><br />Today
          </h1>
          <p style={{ fontSize: 18, color: '#5a7a5a', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Connect with top companies. Whether you're a fresher or experienced — your next opportunity is here.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn-primary" style={{ padding: '14px 32px', fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>Browse All Jobs →</Link>
            <Link to="/register" className="btn-outline" style={{ padding: '14px 32px', fontSize: 15, textDecoration: 'none', display: 'inline-block', background: 'white' }}>Post a Job</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 56, marginTop: 56, paddingTop: 40, borderTop: '1px solid #d8e8d8' }}>
            {[{v:'2,400+',l:'Jobs Posted'},{v:'180+',l:'Companies'},{v:'1,200+',l:'Hired'}].map((s,i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, color: '#16a34a' }}>{s.v}</div>
                <div style={{ fontSize: 13, color: '#5a7a5a', fontWeight: 500, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0f1f0f', marginBottom: 4 }}>Latest Jobs</h2>
            <p style={{ fontSize: 14, color: '#5a7a5a' }}>Fresh opportunities posted this week</p>
          </div>
          <Link to="/jobs" style={{ fontSize: 14, fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>View all →</Link>
        </div>

        {jobs.length === 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {[1,2,3].map(i => (
              <div key={i} className="card" style={{ padding: 24, height: 220 }}>
                <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 12, width: '100%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 12, width: '60%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ background: '#0f1f0f', borderRadius: 20, padding: '56px 40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Ready to Hire Top Talent?</h2>
          <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 32 }}>Post your job and reach thousands of qualified candidates</p>
          <Link to="/register" className="btn-primary" style={{ padding: '14px 36px', fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>Start Hiring Free →</Link>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #d8e8d8', padding: '24px', textAlign: 'center', color: '#5a7a5a', fontSize: 13 }}>
        © 2025 HireHub — Built with Django + React
      </footer>
    </div>
  )
}