import { useState } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      {user ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  )
}

export default App