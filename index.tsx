import React, { useState } from 'react';
import { Calendar, Phone, Mail, Sun, Moon, Clock, User, Heart, Home } from 'lucide-react';

export default function FamilyDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-10-25', time: '10:00 AM', title: 'Family Reunion Planning' },
    { id: 2, date: '2025-10-28', time: '3:00 PM', title: 'Mom Birthday Celebration' },
    { id: 3, date: '2025-11-02', time: '2:00 PM', title: 'School Parent-Teacher Meeting' }
  ]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', title: '' });

  const familyMembers = [
    { name: 'John Smith', role: 'Father', phone: '+1 (555) 123-4567', email: 'john@family.com', avatar: '👨' },
    { name: 'Sarah Smith', role: 'Mother', phone: '+1 (555) 123-4568', email: 'sarah@family.com', avatar: '👩' },
    { name: 'Emma Smith', role: 'Daughter', phone: '+1 (555) 123-4569', email: 'emma@family.com', avatar: '👧' },
    { name: 'Lucas Smith', role: 'Son', phone: '+1 (555) 123-4570', email: 'lucas@family.com', avatar: '👦' }
  ];

  const handleAddAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.title) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
      setNewAppointment({ date: '', time: '', title: '' });
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getUpcomingAppointments = () => {
    return appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'} border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'} p-3 rounded-2xl shadow-lg`}>
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Smith Family
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Staying connected, together
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setShowContactModal(true)}
            className={`${darkMode ? 'bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' : 'bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3`}
          >
            <Phone className="w-6 h-6" />
            <span className="text-xl font-semibold">Contact Family</span>
          </button>
          <div className={`${darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'} text-white p-6 rounded-2xl shadow-lg flex items-center justify-center gap-3`}>
            <Heart className="w-6 h-6" />
            <span className="text-xl font-semibold">4 Family Members</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <Calendar className="w-6 h-6 text-purple-500" />
                Upcoming Appointments
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              {getUpcomingAppointments().map((apt) => (
                <div key={apt.id} className={`${darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-purple-50 to-pink-50'} p-4 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-purple-100'} hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {apt.title}
                      </h3>
                      <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAppointment(apt.id)}
                      className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'} transition-colors`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-4 border`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Add New Appointment</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none`}
                  />
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Appointment title"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-purple-500 outline-none`}
                />
                <button
                  onClick={handleAddAppointment}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
              <User className="w-6 h-6 text-blue-500" />
              Family Members
            </h2>
            <div className="space-y-4">
              {familyMembers.map((member, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100'} p-4 rounded-xl transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{member.avatar}</div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className={`space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowContactModal(false)}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full p-6`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Family</h2>
              <button onClick={() => setShowContactModal(false)} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} text-2xl`}>×</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {familyMembers.map((member, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} p-4 rounded-xl`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{member.avatar}</div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href={`tel:${member.phone}`} className={`flex items-center gap-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Call</span>
                    </a>
                    <a href={`mailto:${member.email}`} className={`flex items-center gap-2 ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}>
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
