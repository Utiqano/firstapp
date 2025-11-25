import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <button onClick={() => setLanguage('ar')} className={language === 'ar' ? 'active' : ''}>العربية</button>
      <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
      <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'active' : ''}>FR</button>
    </div>
  )
}