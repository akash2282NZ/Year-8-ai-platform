'use client'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, Arial', margin: 0 }}>
        <div style={{ padding: 12, background: '#0ea5e9', color: 'white', display:'flex', gap:12 }}>
          <a href="/" style={{ color:'white', textDecoration:'none', fontWeight:700 }}>Year 8 Learning</a>
          <a href="/login" style={{ color:'white' }}>Login</a>
        </div>
        <main style={{ maxWidth: 1000, margin: '20px auto', padding: 12 }}>
          {children}
        </main>
      </body>
    </html>
  )
}