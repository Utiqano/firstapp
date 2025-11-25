import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

export default function AddMatchModal({ onClose, onSuccess }) {
  const { t } = useLanguage()
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('matches').insert({
      home_team: homeTeam,
      away_team: awayTeam,
      home_score: parseInt(homeScore) || null,
      away_score: parseInt(awayScore) || null,
      match_date: new Date().toISOString(),
    })

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{t('newMatchTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder={t('homeTeam')}
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            required
          />
          <input
            placeholder={t('awayTeam')}
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            required
          />
          <div className="scores">
            <input
              type="number"
              placeholder={t('homeGoals')}
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder={t('awayGoals')}
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? '...' : t('saveMatch')}
            </button>
            <button type="button" onClick={onClose} className="cancel">
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}