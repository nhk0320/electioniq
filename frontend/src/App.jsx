import React, { useState } from 'react'
import { MessageSquare, LayoutList, PenTool, BookA, Flag, Menu, X, BookOpen, MapPin, Globe } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'
import ChatAssistant from './components/ChatAssistant'
import Timeline from './components/Timeline'
import Quiz from './components/Quiz'
import Glossary from './components/Glossary'
import VoterGuide from './components/VoterGuide'
import BoothLocator from './components/BoothLocator'
import Helpline from './components/Helpline'

function App() {
  const [activeTab, setActiveTab] = useState('guide')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const tabs = [
    { id: 'guide', label: t('tabGuide'), icon: <BookOpen size={20} /> },
    { id: 'booth', label: t('tabBooth'), icon: <MapPin size={20} /> },
    { id: 'timeline', label: t('tabProcess'), icon: <LayoutList size={20} /> },
    { id: 'assistant', label: t('tabAssistant'), icon: <MessageSquare size={20} /> },
    { id: 'quiz', label: t('tabQuiz'), icon: <PenTool size={20} /> },
    { id: 'glossary', label: t('tabGlossary'), icon: <BookA size={20} /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'guide': return <VoterGuide />
      case 'booth': return <BoothLocator />
      case 'timeline': return <Timeline />
      case 'assistant': return <ChatAssistant />
      case 'quiz': return <Quiz />
      case 'glossary': return <Glossary />
      default: return <VoterGuide />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 text-white sticky top-0 z-50 shadow-lg border-b border-orange-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Flag className="text-orange-400" size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                {t('appTitle')}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center bg-black/20 rounded-lg p-1 border border-white/10">
                <Globe size={16} className="text-orange-200 ml-2 mr-1" />
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-sm text-white focus:outline-none py-1 px-2 cursor-pointer [&>option]:text-gray-900"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                  <option value="or">ଓଡ଼ିଆ (Odia)</option>
                </select>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-orange-100 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Ribbon */}
        <div className="hidden md:block bg-orange-950/50 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'bg-white/15 text-white shadow-inner ring-1 ring-white/20' 
                      : 'text-orange-100/70 hover:bg-white/5 hover:text-white'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-orange-950/80 backdrop-blur-md pb-4 pt-2 px-4 shadow-inner">
            <div className="mb-4 pb-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm text-orange-200">Language / भाषा</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black/30 rounded p-1.5 text-sm text-white focus:outline-none border border-white/10"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="bn">বাংলা</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
                <option value="or">ଓଡ଼ିଆ</option>
              </select>
            </div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium mb-2 flex items-center gap-3 transition-colors
                  ${activeTab === tab.id 
                    ? 'bg-orange-600 text-white shadow-md' 
                    : 'text-orange-100 hover:bg-orange-800/50'}`}
              >
                <span className={`${activeTab === tab.id ? 'text-orange-200' : 'text-orange-300'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-200px)]">
        {/* Header Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {t('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">{t('heroHighlight')}</span> {t('heroSubtitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('heroDesc')}
          </p>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1000&auto=format&fit=crop" alt="Vote India" className="w-full h-auto object-cover max-h-96" onError={(e) => { e.target.style.display = 'none' }} />
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="transition-all duration-500 ease-in-out relative">
          {renderContent()}
        </div>
      </main>

      {/* Floating Helpline Component */}
      <Helpline />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-gray-800/50 w-max mx-auto rounded-full border border-gray-700">
            <Flag size={16} className="text-orange-500" />
            <span className="text-gray-300 font-medium tracking-wide">{t('appTitle')} Platform</span>
            <Flag size={16} className="text-green-500" />
          </div>
          <p className="text-sm">
            {t('footerText')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
