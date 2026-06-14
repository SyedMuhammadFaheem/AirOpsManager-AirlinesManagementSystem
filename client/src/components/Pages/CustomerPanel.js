import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Plane, Ticket, Star, Search } from 'lucide-react';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

export default function CustomerPanel() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/CustomerPanel/${id}`).then(r => setUser(r.data || {}));
  }, [id]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const actions = [
    { label: 'Book a Flight', desc: 'Search and reserve your next journey', icon: Search, to: `/book-ticket/${id}`, color: 'bg-sky-500 hover:bg-sky-600 text-white' },
    { label: 'My Tickets', desc: 'View your boarding passes', icon: Ticket, to: `/my-tickets/${id}`, color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
    { label: 'View Profile', desc: 'Manage your account details', icon: User, to: `/profile/${id}`, color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
    { label: 'Leave a Review', desc: 'Share your travel experience', icon: Star, to: `/add-review/${id}`, color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* Welcome */}
        <div className="bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={26} className="text-white" />
            </div>
            <div>
              <p className="text-sky-100 text-sm">{greeting}</p>
              <h1 className="text-2xl font-bold">{user.fname ? `${user.fname} ${user.lname || ''}` : 'Welcome back!'}</h1>
              <p className="text-sky-200 text-sm mt-0.5">AirOps Manager Customer Portal</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2">
            <Plane size={14} className="text-sky-200" />
            <span className="text-sky-100 text-sm">Ready for your next adventure?</span>
          </div>
        </div>

        {/* Quick actions */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          {actions.map(({ label, desc, icon: Icon, to, color }) => (
            <Link key={label} to={to}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${color}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.includes('sky') ? 'bg-white/20' : 'bg-sky-50'}`}>
                <Icon size={18} className={color.includes('sky') ? 'text-white' : 'text-sky-500'} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${color.includes('sky') ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                <p className={`text-xs mt-0.5 ${color.includes('sky') ? 'text-sky-100' : 'text-gray-500'}`}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
