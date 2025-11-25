import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import './ThursdaySidebar.css'

export default function ThursdaySidebar({ user }) {
  const { t, language } = useLanguage()
  const [participants, setParticipants] = useState([])
  const [thisWeekDate, setThisWeekDate] = useState('')
  const [hasResponded, setHasResponded] = useState(false)
  const [loading, setLoading] = useState(true)

  const getNextThursday = () => {
    const today = new Date()
    const day = today.getDay()
    const diff = day <= 4 ? 4 - day : 11 - day
    const nextThursday = new Date(today)
    nextThursday.setDate(today.getDate() + diff)
    return nextThursday.toISOString().split('T')[0]
  }

  const weekDate = getNextThursday()

  useEffect(() => {
    setThisWeekDate(weekDate)
    fetchParticipants()
  }, [user, weekDate])

  const fetchParticipants = async () => {
    const { data } = await supabase
      .from('thursday_participants')
      .select('*')
      .eq('week_date', weekDate)
      .order('created_at')

    setParticipants(data || [])
    if (user && data) {
      const already = data.find(p => p.user_email === user.email)
      setHasResponded(!!already)
    }
    setLoading(false)
  }

  const handleParticipate = async (participate) => {
    if (!user) return alert(t('loginFirst') || 'Connectez-vous d\'abord')

    const name = user.user_metadata?.full_name || user.email.split('@')[0]

    const { error } = await supabase.from('thursday_participants').insert({
      user_email: user.email,
      user_name: name,
      will_participate: participate,
      week_date: weekDate
    })

    if (!error) fetchParticipants()
    else alert('Erreur : ' + error.message)
  }

  const yesCount = participants.filter(p => p.will_participate).length

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' }
    return new Date(dateStr).toLocaleDateString(
      language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-GB',
      options
    )
  }

  return (
    <div className="thursday-sidebar">
      <div className="sidebar-header">
        <h3>{t('thursdayMatch')}</h3>
        <p className="thursday-date">{formatDate(weekDate)}</p>
      </div>

      <div className="question">
        <strong>{t('willYouCome')}</strong>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : hasResponded ? (
        <div className="already-responded">
          <p>{t('thanksResponse')}</p>
          <p>{t('participantsCount')}: <strong>{yesCount}</strong></p>
        </div>
      ) : (
        <div className="participate-buttons">
          <button className="yes-btn" onClick={() => handleParticipate(true)}>
            {t('yesComing')}
          </button>
          <button className="no-btn" onClick={() => handleParticipate(false)}>
            {t('noNotComing')}
          </button>
        </div>
      )}

      <div className="participants-list">
        <h4>{t('participants')} ({yesCount})</h4>
        {participants
          .filter(p => p.will_participate)
          .map((p, i) => (
            <div key={i} className="participant">{p.user_name}</div>
          ))}
        {yesCount === 0 && <p className="no-one">{t('noOneYet')}</p>}
      </div>
    </div>
  )
}