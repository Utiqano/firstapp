export default function Home({ user, setUser }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f4c3a',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1>Hello {user.email} 👋</h1>
      <p>Welcome to WKW Automotive Football App</p>
      <button onClick={handleLogout} style={{
        padding: '12px 24px',
        fontSize: '16px',
        background: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>
  )
}