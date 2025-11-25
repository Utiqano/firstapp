import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './Login.css'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setUser(data.user)
    }
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert('Check your email for confirmation link!')
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>⚽ WKW Automotive</h1>
        <p>Football Match Tracker</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Log In'}
          </button>
          <button type="button" onClick={handleRegister} disabled={loading} className="register-btn">
            Register
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  )
}