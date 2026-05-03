import React, { useState } from 'react'
import { MessageSquare, LayoutList, PenTool, BookA, Flag, Menu, X } from 'lucide-react'
import ChatAssistant from './components/ChatAssistant'
import Timeline from './components/Timeline'
import Quiz from './components/Quiz'
import Glossary from './components/Glossary'

function App() {
  const [activeTab, setActiveTab] = useState('timeline')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'timeline', label: 'Process Timeline', icon: <LayoutList size={20} /> },
    { id: 'assistant', label: 'AI Assistant', icon: <MessageSquare size={20} /> },
    { id: 'quiz', label: 'Knowledge Quiz', icon: <PenTool size={20} /> },
    { id: 'glossary', label: 'Election Dictionary', icon: <BookA size={20} /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'timeline': return <Timeline />
      case 'assistant': return <ChatAssistant />
      case 'quiz': return <Quiz />
      case 'glossary': return <Glossary />
      default: return <Timeline />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Flag className="text-red-500" size={28} />
              <span className="text-2xl font-bold tracking-tight">ElectionIQ</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                    ${activeTab === tab.id 
                      ? 'bg-blue-800 text-white shadow-inner' 
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-blue-100 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 pb-3 pt-2 px-2 shadow-inner">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium mb-1 flex items-center gap-3
                  ${activeTab === tab.id 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Hero Section */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Understand the <span className="text-blue-600">Election</span> Process
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your interactive guide to how democracy works in the United States, from registration to inauguration.
          </p>
        </div>

        {/* Dynamic Content Area */}
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Flag size={16} /> ElectionIQ Educational Platform
          </p>
          <p className="text-sm">
            Powered by AI. Designed for educational, non-partisan purposes.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
