'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, LogOut, Camera } from 'lucide-react'
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts'

const sessionColors = ['#164863', '#427D9D', '#9BBEC8', '#DDF2FD']

const completionData = [
  { name: 'Session 1', completion: 85, fill: sessionColors[0] },
  { name: 'Session 2', completion: 65, fill: sessionColors[1] },
  { name: 'Session 3', completion: 90, fill: sessionColors[2] },
  { name: 'Session 4', completion: 75, fill: sessionColors[3] },
]

const weeklyHoursData = [
  { name: 'Week 1', hours: 10, fill: sessionColors[0] },
  { name: 'Week 2', hours: 15, fill: sessionColors[1] },
  { name: 'Week 3', hours: 12, fill: sessionColors[2] },
  { name: 'Week 4', hours: 18, fill: sessionColors[3] },
]

const strengthWeaknessData = [
  { subject: 'Session 1', A: 120, fullMark: 150 },
  { subject: 'Session 2', A: 98, fullMark: 150 },
  { subject: 'Session 3', A: 86, fullMark: 150 },
  { subject: 'Session 4', A: 99, fullMark: 150 },
]

const quizMarksData = [
  { name: 'Session 1', marks: 80 },
  { name: 'Session 2', marks: 75 },
  { name: 'Session 3', marks: 90 },
  { name: 'Session 4', marks: 85 },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('progress')
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#E2F1E7] to-[#629584]">
      <motion.div
        className="w-1/5 bg-gradient-to-br from-[#243642] to-[#387478] text-white overflow-auto backdrop-blur-md bg-opacity-80"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#387478] to-[#629584] overflow-hidden mb-4">
              <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-[#E2F1E7]">john.doe@example.com</p>
          </div>
          <motion.button
            className="w-full bg-gradient-to-r from-[#387478] to-[#629584] text-white py-2 px-4 rounded-lg mb-4 hover:from-[#629584] hover:to-[#387478] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Close Edit' : 'Edit Profile'}
          </motion.button>
          <nav className="space-y-2">
            <NavItem icon={<User size={18} />} text="My Progress" isActive={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
            <NavItem icon={<Settings size={18} />} text="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            <NavItem icon={<LogOut size={18} />} text="Logout" isActive={activeTab === 'logout'} onClick={() => setActiveTab('logout')} />
          </nav>
        </div>
      </motion.div>
      <motion.div
        className="w-4/5 bg-gradient-to-br from-[#387478] to-[#629584] overflow-auto backdrop-blur-md bg-opacity-80"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          {isEditing ? (
            <EditProfile />
          ) : activeTab === 'progress' ? (
            <MyProgress />
          ) : activeTab === 'settings' ? (
            <div className="text-white text-2xl">Settings Component (Not Implemented)</div>
          ) : (
            <div className="text-white text-2xl">Logout Component (Not Implemented)</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function NavItem({ icon, text, isActive, onClick }) {
  return (
    <motion.div
      className={`flex items-center space-x-2 cursor-pointer transition-colors duration-300 ${
        isActive ? 'text-[#629584]' : 'text-[#E2F1E7] hover:text-[#629584]'
      }`}
      onClick={onClick}
      whileHover={{ x: 5 }}
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  )
}

function MyProgress() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChartCard title="Session Completion Rate">
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={completionData}>
            <RadialBar
              minAngle={15}
              label={{ fill: '#fff', position: 'insideStart' }}
              background
              clockWise
              dataKey="completion"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <SessionLegend />
      </ChartCard>
      <ChartCard title="Weekly Hours Spent">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyHoursData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours">
              {weeklyHoursData.map((entry, index) => (
                <motion.rect key={`bar-${index}`} fill={entry.fill}
                  initial={{ y: 300, height: 0 }}
                  animate={{ y: 0, height: 300 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <SessionLegend />
      </ChartCard>
      <ChartCard title="Strengths and Weaknesses">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthWeaknessData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Student" dataKey="A" stroke="#164863" fill="#164863" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <SessionLegend />
      </ChartCard>
      <ChartCard title="Average Quiz Marks">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={quizMarksData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#164863" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#DDF2FD" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="marks" stroke="#164863" fill="url(#colorMarks)" />
          </AreaChart>
        </ResponsiveContainer>
        <SessionLegend />
      </ChartCard>
    </motion.div>
  )
}

function ChartCard({ title, children }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#243642] to-[#387478] rounded-xl p-4 backdrop-blur-md bg-opacity-80"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 text-[#E2F1E7]">{title}</h3>
      {children}
    </motion.div>
  )
}

function SessionLegend() {
  return (
    <motion.div 
      className="flex justify-center mt-4 space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {sessionColors.map((color, index) => (
        <motion.div 
          key={color} 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></div>
          <span className="text-sm text-white">Session {index + 1}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function EditProfile() {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#243642] to-[#387478] rounded-2xl p-6 text-white max-w-2xl mx-auto backdrop-blur-md bg-opacity-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-[#629584]">Edit Profile</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="photo" className="block text-sm font-medium mb-1 text-[#E2F1E7]">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-[#387478] overflow-hidden">
              <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <motion.button
              className="flex items-center space-x-2 bg-[#387478] text-white py-2 px-4 rounded-lg hover:bg-[#629584] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera size={18} />
              <span>Change Photo</span>
            </motion.button>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-[#E2F1E7]">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full bg-[#387478] bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-[#E2F1E7] focus:outline-none focus:ring-2 focus:ring-[#629584]"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium mb-1 text-[#E2F1E7]">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            className="w-full bg-[#387478] bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-[#E2F1E7] focus:outline-none focus:ring-2 focus:ring-[#629584]"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium mb-1 text-[#E2F1E7]">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="w-full bg-[#387478] bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-[#E2F1E7] focus:outline-none focus:ring-2 focus:ring-[#629584]"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium mb-1 text-[#E2F1E7]">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full bg-[#387478] bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-[#E2F1E7] focus:outline-none focus:ring-2 focus:ring-[#629584]"
            placeholder="Confirm new password"
          />
        </div>
        <motion.button
          className="w-full bg-gradient-to-r from-[#629584] to-[#387478] text-white py-2 px-4 rounded-lg mt-4 hover:from-[#387478] hover:to-[#629584] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  )
}