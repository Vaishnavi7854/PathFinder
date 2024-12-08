import { useState } from 'react'
import './App.css'
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'
import Profile from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ChatBot from './components/ChatBot'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path='/loginsignup' element={<LoginSignUp />}/>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }/>
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }/>
            <Route path='/chat' element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            }/>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
