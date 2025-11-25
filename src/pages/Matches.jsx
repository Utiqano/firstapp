import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AddMatchModal from '../components/AddMatchModal'
import ThursdaySidebar from '../components/ThursdaySidebar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import './Matches.css'

export default function Matches({ user, setUser }) {
 const { t, language } = useLanguage()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchMatches = async () => {
    const { data } = await supabase.from('matches').select('*').order('match_date', { ascending: false })
    setMatches(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchMatches() }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="matches-page">
      <ThursdaySidebar user={user} />

      <div className="main-content">
        <div className="header">
          <h1>WKW Automotive</h1>
          <p>{t('welcome')} {user.email.split('@')[0]}!</p>
          
          <div className="header-top">
            <LanguageSwitcher />
          </div>

          <div className="header-buttons">
            <button onClick={() => setShowAddModal(true)} className="add-btn">
              {t('addMatch')}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              {t('logout')}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">{t('loading')}</div>
        ) : matches.length === 0 ? (
          <div className="no-matches">
            <p>{t('noMatches')}</p>
            <button onClick={() => setShowAddModal(true)}>{t('addFirstMatch')}</button>
          </div>
        ) : (
          <div className="matches-grid">
            {matches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-teams">
                  <div className="team home">
                    <span>{match.home_team}</span>
                    <strong>{match.home_score ?? 0}</strong>
                  </div>
                  <div className="vs">VS</div>
                  <div className="team away">
                    <strong>{match.away_score ?? 0}</strong>
                    <span>{match.away_team}</span>
                  </div>
                </div>
                <div className="match-date">
                  {new Date(match.match_date).toLocaleString(
                    language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-GB'
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <AddMatchModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => { fetchMatches(); setShowAddModal(false) }}
          />
        )}
      </div>
    </div>
  )
}