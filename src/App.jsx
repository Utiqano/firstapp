import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Matches from './pages/Matches'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      {user ? <Matches user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  )
}

export default App