import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routing/Routing'
import {auth} from './Utility/firebase'

import { onAuthStateChanged } from 'firebase/auth'
import { DataContext } from './components/DataProvider/DataProvider'
import { Type } from './Utility/action.type'

const App = () => {
  const context = useContext(DataContext)
  const [authChecked, setAuthChecked] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  
  // Hide splash after 2 seconds minimum
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-2xl font-bold">T+</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">TenaPlus</h1>
          <div className="animate-pulse">
            <p className="text-gray-600">Loading your health journey...</p>
          </div>
        </div>
      </div>
    )
  }

  const [state, dispatch] = context

  useEffect(() => {
    // Optional: Check localStorage first for faster auth check
    const savedUser = localStorage.getItem('tenaplus_user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        dispatch({
          type: Type.SET_USER,
          user: parsedUser
        })
      } catch (e) {
        console.error('Error parsing saved user:', e)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log('[Auth] onAuthStateChanged: ', authUser)
      
      // Save to localStorage for faster load next time
      if (authUser) {
        const userData = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL
        }
        localStorage.setItem('tenaplus_user', JSON.stringify(userData))
      } else {
        localStorage.removeItem('tenaplus_user')
      }
      
      dispatch({
        type: Type.SET_USER,
        user: authUser || null
      })
      
      setAuthChecked(true)
    })

    return () => unsubscribe()
  }, [dispatch])

  // Show splash screen for at least 2 seconds OR until auth is checked
  if (showSplash || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 animate-fade-in">
        <div className="text-center px-4">
          {/* Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl animate-pulse-slow">
              <PillIcon className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          {/* App Name */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent mb-4 animate-slide-up">
            TenaPlus
          </h1>
          
          {/* Tagline */}
          <p className="text-gray-600 mb-8 max-w-sm mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your AI-powered health companion
          </p>
          
          {/* Loading indicator */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-500 border-t-transparent"></div>
            <span className="text-gray-700 font-medium">
              {!authChecked ? 'Checking authentication...' : 'Almost ready...'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Routing />
      </div>
    </Router>
  )
}

// Simple pill icon component
const PillIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
)

export default App