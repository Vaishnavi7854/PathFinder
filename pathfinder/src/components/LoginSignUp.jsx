import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InputField = ({ type, placeholder, value, onChange }) => (
  <motion.input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-[#E2F1E7] placeholder-[#E2F1E7] placeholder-opacity-70 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-[#629584]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  />
)

const Button = ({ children, isSignUp = false, onClick }) => (
  <motion.button
    className={`w-full p-3 ${
      isSignUp ? 'bg-[#629584]' : 'bg-[#387478]'
    } bg-opacity-80 text-white rounded-lg hover:bg-opacity-100 transition-colors backdrop-blur-sm`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

const LoginForm = ({ onToggle, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={() => onLogin(email, password)}>Login</Button>
      <p className="text-center text-[#E2F1E7]">
        Don't have an account?{' '}
        <button onClick={onToggle} className="text-[#629584] hover:underline font-semibold">
          Sign up
        </button>
      </p>
    </motion.div>
  )
}

const SignupForm = ({ onToggle, onSignup }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <InputField type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button isSignUp={true} onClick={() => onSignup(name, email, password)}>Sign Up</Button>
      <p className="text-center text-[#E2F1E7]">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-[#629584] hover:underline font-semibold">
          Login
        </button>
      </p>
    </motion.div>
  )
}

export default function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)

  const handleSignup = async (name, email, password) => {
    const response = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json()
    console.log(data)
  }

  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:8000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ username: email, password }),
      credentials: 'include'  // Include cookies in the request
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#243642] via-[#387478] to-[#629584] animate-gradient-x">
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="relative">
          <motion.h2
            className="text-3xl font-bold text-center text-[#E2F1E7] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h2>
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm key="login" onToggle={toggleForm} onLogin={handleLogin} />
            ) : (
              <SignupForm key="signup" onToggle={toggleForm} onSignup={handleSignup} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}