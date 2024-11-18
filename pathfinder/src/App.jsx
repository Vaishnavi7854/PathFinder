import { useState } from 'react'
import './App.css'
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'
import Profile from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/loginsignup' element={<LoginSignUp />}/>
          <Route path='/' element={<HomePage />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
