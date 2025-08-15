'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL

function useAuth() {
  const [auth, setAuth] = useState(null)
  useEffect(()=>{
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) setAuth({ token: t, user: JSON.parse(u) })
  },[])
  return auth
}

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = useAuth()

  useEffect(() => {
    if (!API || !auth) return
    fetch(`${API}/lessons`, { headers: { Authorization: `Bearer ${auth.token}` }})
      .then(r=>r.json()).then(setData).finally(()=>setLoading(false))
  }, [auth])

  if (!API) return <p style={{color:'crimson'}}>Set NEXT_PUBLIC_API_URL env variable to your Railway API URL.</p>
  if (!auth) return <p>Please <a href="/login">log in</a> to view subjects.</p>
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Subjects</h1>
      {data?.map(sub => (
        <div key={sub.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 12 }}>
          <h2>{sub.name}</h2>
          {sub.topics?.map(t => (
            <div key={t.id} style={{ padding: 8, margin: '8px 0', background: '#f9fafb', borderRadius: 8 }}>
              <strong>{t.name}</strong>
              <div style={{ fontSize: 14, color: '#555' }}>{t.lessons?.length} lesson(s)</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}