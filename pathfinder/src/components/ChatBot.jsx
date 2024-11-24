'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'

const formatResponse = (text) => {
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line.split('*').map((part, i) => (
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      ))}
      <br />
    </React.Fragment>
  ));
  return formattedText;
};

export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState('light')
  const chatContainerRef = useRef(null)

  const handleSend = async () => {
    if (input.trim() === '') return
    const newMessages = [...messages, { text: input, isUser: true }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/chat', { user_input: input })
      setMessages([...newMessages, { text: formatResponse(response.data.response), isUser: false }])
    } catch (error) {
      console.error('Error fetching response:', error)
      setMessages([...newMessages, { text: formatResponse('Error fetching response'), isUser: false }])
    }
    setIsLoading(false)
  }

  const handleEdit = () => {
    if (messages.length === 0) return
    const lastUserMessage = messages[messages.length - 1]
    if (!lastUserMessage.isUser) return
    setInput(lastUserMessage.text)
    setMessages(messages.slice(0, -1))
  }

  const handleClearChat = () => {
    setMessages([])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className={`flex flex-col h-screen ${theme === 'light' ? 'bg-gradient-to-br from-[#E2F1E7] to-[#629584]' : 'bg-gradient-to-br from-[#243642] to-[#387478]'}`}>
      <motion.div
        className="flex justify-between items-center p-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-[#387478]' : 'text-[#E2F1E7]'}`}>AI Chatbot</h1>
        <div className="flex space-x-2">
          <motion.button
            onClick={handleClearChat}
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-[#629584] text-white' : 'bg-[#E2F1E7] text-[#243642]'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={20} />
          </motion.button>
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-[#629584] text-white' : 'bg-[#E2F1E7] text-[#243642]'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        ref={chatContainerRef}
        className={`flex-grow overflow-y-auto p-4 ${theme === 'light' ? 'bg-white bg-opacity-50' : 'bg-gray-800 bg-opacity-50'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <motion.div
                className={`flex items-start space-x-2 ${message.isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.isUser
                      ? theme === 'light' ? 'bg-[#629584]' : 'bg-[#E2F1E7]'
                      : theme === 'light' ? 'bg-[#387478]' : 'bg-[#629584]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {message.isUser ? '👤' : '🤖'}
                </motion.div>
                <motion.div
                  className={`max-w-3xl p-3 rounded-lg ${
                    message.isUser
                      ? theme === 'light' ? 'bg-[#629584] text-white' : 'bg-[#E2F1E7] text-[#243642]'
                      : theme === 'light' ? 'bg-[#E2F1E7] text-[#243642]' : 'bg-[#629584] text-white'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {message.text}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex space-x-2 justify-start"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${theme === 'light' ? 'bg-[#387478]' : 'bg-[#E2F1E7]'}`}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className={`flex items-center p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={`flex-grow p-3 resize-none ${theme === 'light' ? 'bg-white text-[#243642]' : 'bg-gray-800 text-white'} placeholder-gray-400 focus:outline-none`}
          rows={1}
        />
        <motion.button
          onClick={handleSend}
          className={`p-3 ${theme === 'light' ? 'text-[#387478] hover:text-[#629584]' : 'text-[#E2F1E7] hover:text-white'} transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Send size={20} />
        </motion.button>
        <motion.button
          onClick={handleEdit}
          className={`p-3 ${theme === 'light' ? 'text-[#387478] hover:text-[#629584]' : 'text-[#E2F1E7] hover:text-white'} transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={messages.length === 0 || !messages[messages.length - 1].isUser}
        >
          <Edit2 size={20} />
        </motion.button>
      </motion.div>
    </div>
  )
}
