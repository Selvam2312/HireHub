import { Link } from 'react-router-dom'

const typeBadge = {
  full_time: { bg: '#dcfce7', color: '#15803d', label: 'Full Time' },
  part_time: { bg: '#dbeafe', color: '#1d4ed8', label: 'Part Time' },
  internship: { bg: '#f3e8ff', color: '#7e22ce', label: 'Internship' },
  contract: { bg: '#fef3c7', color: '#92400e', label: 'Contract' },
  remote: { bg: '#e0f2fe', color: '#0369a1', label: 'Remote' },
}

export default function JobCard({ job }) {
  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 86400000)
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    return `${diff}d ago`
  }
  const badge = typeBadge[job.job_type] || typeBadge.full_time

  return (
    <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="card card-hover" style={{ padding: 24, height: '100%', cursor: 'pointer', transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, color: '#15803d', fontFamily: 'Outfit, sans-serif' }}>
            {job.company?.charAt(0)}
          </div>
          <span className="badge" style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>
        </div>

        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 700, color: '#0f1f0f', marginBottom: 4 }}>{job.title}</h3>
        <p style={{ fontSize: 13, color: '#5a7a5a', marginBottom: 14, fontWeight: 500 }}>{job.company}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 14, fontSize: 12, color: '#5a7a5a' }}>
          <span>📍 {job.location}</span>
          {job.salary_min && <span>💰 ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}</span>}
          <span>🎓 {job.experience === 'fresher' ? 'Fresher' : `${job.experience} yrs`}</span>
        </div>

        {job.skills_list?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {job.skills_list.slice(0, 4).map((s, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: '#f0f5f0', color: '#5a7a5a', border: '1px solid #d8e8d8' }}>{s}</span>
            ))}
            {job.skills_list.length > 4 && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#f0f5f0', color: '#5a7a5a' }}>+{job.skills_list.length - 4}</span>}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #d8e8d8' }}>
          <span style={{ fontSize: 12, color: '#5a7a5a' }}>{timeAgo(job.created_at)}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>View Details →</span>
        </div>
      </div>
    </Link>
  )
}