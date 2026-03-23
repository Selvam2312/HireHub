import { useEffect, useState } from 'react'
import api from '../api/axios'
import useAuthStore from '../store/authStore'

export default function Profile() {
  const { user } = useAuthStore()
  const isSeeker = user?.role === 'seeker'
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const endpoint = isSeeker ? '/profiles/seeker/' : '/profiles/employer/'

  useEffect(() => {
    api.get(endpoint).then(r => { setForm(r.data); setLoading(false) })
  }, [])

  const set = (k,v) => setForm(prev => ({...prev, [k]:v}))

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await api.put(endpoint, form); setSuccess(true); setTimeout(() => setSuccess(false), 3000) }
    finally { setSaving(false) }
  }

  if (loading) return (
    <div style={{ paddingTop: 80, maxWidth: 680, margin: '0 auto', padding: '80px 24px' }}>
      <div className="skeleton" style={{ height: 300, borderRadius: 16 }} />
    </div>
  )

  const Field = ({ label, children }) => (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#0f1f0f', marginBottom: 6, display: 'block' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#f8faf8' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8d8', padding: '32px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 26, color: '#15803d', fontFamily: 'Outfit', flexShrink: 0 }}>
            {user?.full_name?.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: '#0f1f0f', marginBottom: 2 }}>{user?.full_name}</h1>
            <p style={{ fontSize: 13, color: '#5a7a5a' }}>{user?.role?.charAt(0).toUpperCase()+user?.role?.slice(1)} • {user?.email}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>
        {success && <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 13, fontWeight: 600 }}>✅ Profile updated successfully!</div>}

        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {isSeeker ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Phone"><input value={form.phone||''} onChange={e => set('phone',e.target.value)} className="input-field" placeholder="+91 98765 43210" /></Field>
                  <Field label="Location"><input value={form.location||''} onChange={e => set('location',e.target.value)} className="input-field" placeholder="Chennai, TN" /></Field>
                  <Field label="Education"><input value={form.education||''} onChange={e => set('education',e.target.value)} className="input-field" placeholder="B.E. Computer Science" /></Field>
                  <Field label="Experience (Years)"><input type="number" value={form.experience_years||0} onChange={e => set('experience_years',e.target.value)} className="input-field" /></Field>
                </div>
                <Field label="Skills (comma separated)"><input value={form.skills||''} onChange={e => set('skills',e.target.value)} className="input-field" placeholder="React, Python, Django..." /></Field>
                <Field label="Bio"><textarea rows={3} value={form.bio||''} onChange={e => set('bio',e.target.value)} className="input-field" style={{ resize: 'none' }} placeholder="Tell employers about yourself..." /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <Field label="LinkedIn"><input value={form.linkedin||''} onChange={e => set('linkedin',e.target.value)} className="input-field" placeholder="linkedin.com/in/..." /></Field>
                  <Field label="GitHub"><input value={form.github||''} onChange={e => set('github',e.target.value)} className="input-field" placeholder="github.com/..." /></Field>
                  <Field label="Portfolio"><input value={form.portfolio||''} onChange={e => set('portfolio',e.target.value)} className="input-field" placeholder="yourportfolio.com" /></Field>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Company Name"><input value={form.company_name||''} onChange={e => set('company_name',e.target.value)} className="input-field" placeholder="Acme Corp" /></Field>
                  <Field label="Industry"><input value={form.industry||''} onChange={e => set('industry',e.target.value)} className="input-field" placeholder="Information Technology" /></Field>
                  <Field label="Company Size"><input value={form.company_size||''} onChange={e => set('company_size',e.target.value)} className="input-field" placeholder="50-200 employees" /></Field>
                  <Field label="Location"><input value={form.location||''} onChange={e => set('location',e.target.value)} className="input-field" placeholder="Chennai, TN" /></Field>
                </div>
                <Field label="Website"><input value={form.website||''} onChange={e => set('website',e.target.value)} className="input-field" placeholder="https://yourcompany.com" /></Field>
                <Field label="About Company"><textarea rows={4} value={form.description||''} onChange={e => set('description',e.target.value)} className="input-field" style={{ resize: 'none' }} placeholder="Tell candidates about your company..." /></Field>
              </>
            )}
            <button type="submit" disabled={saving} className="btn-primary" style={{ padding: 13, fontSize: 15, border: 'none', cursor: 'pointer', marginTop: 8 }}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}