import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const username = "John Doe"
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  return (
    <nav className="bg-[#243642] bg-opacity-40 backdrop-filter backdrop-blur-lg border-b border-[#E2F1E7] border-opacity-20 relative z-10 bg-gradient-to-br from-[#243642] to-[#387478] text-[#E2F1E7]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-bold text-[#E2F1E7] tracking-tight cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            Path<span className="text-[#629584]">Finder</span>
          </motion.div>
          <div className="flex items-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.05, color: "#629584" }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="text-[#E2F1E7] hover:text-[#629584] transition-colors duration-200"
            >
              About Us
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#629584" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="text-[#E2F1E7] hover:text-[#629584] transition-colors duration-200"
            >
              Contact Us
            </motion.a>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#629584] to-[#387478] flex items-center justify-center text-[#E2F1E7] font-bold shadow-lg">
                  {username.charAt(0)}
                </div>
                <ChevronDown className="w-4 h-4 text-[#E2F1E7]" />
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-[#243642] bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg py-3 border border-[#E2F1E7] border-opacity-20"
                    style={{ zIndex: 50 }}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#629584] to-[#387478] flex items-center justify-center text-[#E2F1E7] text-2xl font-bold shadow-lg mb-2">
                        {username.charAt(0)}
                      </div>
                      <span className="text-[#E2F1E7] font-semibold">{username}</span>
                    </div>
                    {[
                      { name: 'My Profile', path: '/profile' },
                      { name: 'Settings', path: '/settings' },
                      { name: 'Logout', path: '/logout' }
                    ].map((item, index) => (
                      <motion.a
                        key={item.name}
                        onClick={() => handleNavigation(item.path)}
                        className="flex items-center px-4 py-2 hover:bg-[#387478] transition-colors duration-200 cursor-pointer"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        {index === 0 && <User className="w-4 h-4 mr-2" />}
                        {index === 1 && <Settings className="w-4 h-4 mr-2" />}
                        {index === 2 && <LogOut className="w-4 h-4 mr-2" />}
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}