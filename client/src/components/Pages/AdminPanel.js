import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, DollarSign, Plane, Users, Plus, CalendarClock, ArrowRight, LogOut } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';

const monthlyMockData = [
  { month: 'Aug', bookings: 12 }, { month: 'Sep', bookings: 18 },
  { month: 'Oct', bookings: 15 }, { month: 'Nov', bookings: 22 },
  { month: 'Dec', bookings: 30 }, { month: 'Jan', bookings: 25 },
  { month: 'Feb', bookings: 28 }, { month: 'Mar', bookings: 35 },
  { month: 'Apr', bookings: 20 }, { month: 'May', bookings: 40 },
  { month: 'Jun', bookings: 38 }, { month: 'Jul', bookings: 45 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 shadow-card">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-brand-400">{payload[0].value} bookings</p>
    </div>
  );
};

export default function AdminPanel() {
  const { logout, auth } = useAuth();
  const history = useHistory();
  const [stats, setStats] = useState({ countt: 0, summ: 0 });
  const [clientCount, setClientCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/booking/getstats').then(r => setStats(r.data)).catch(() => {}),
      apiClient.get('/api/get').then(r => setClientCount(r.data.length)).catch(() => {}),
      apiClient.get('/flight/api/get').then(r => setFlightCount(r.data.length)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    history.push('/signin');
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const kpis = [
    { icon: BookOpen,    label: 'Total Bookings', value: loading ? '—' : stats.countt,      color: 'text-brand-400',   bg: 'bg-brand-500/10',   border: 'border-brand-500/20' },
    { icon: DollarSign,  label: 'Revenue',        value: loading ? '—' : `$${Number(stats.summ || 0).toLocaleString()}`, color: 'text-gold-400', bg: 'bg-gold-500/10', border: 'border-gold-500/20' },
    { icon: Plane,       label: 'Active Flights',  value: loading ? '—' : flightCount,       color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Users,       label: 'Customers',       value: loading ? '—' : clientCount,       color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20' },
  ];

  const quickActions = [
    { icon: Plus,         label: 'Add Flight',    path: '/flights/new',     color: 'bg-brand-500 hover:bg-brand-600 text-white' },
    { icon: CalendarClock,label: 'Add Schedule',  path: '/schedules/new',   color: 'bg-navy-700 hover:bg-navy-600 text-gray-200 border border-navy-600' },
    { icon: Users,        label: 'View Clients',  path: '/clients',         color: 'bg-navy-700 hover:bg-navy-600 text-gray-200 border border-navy-600' },
    { icon: BookOpen,     label: 'All Bookings',  path: '/bookings',        color: 'bg-navy-700 hover:bg-navy-600 text-gray-200 border border-navy-600' },
  ];

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-white">
            {greeting()}, {auth.username || 'Admin'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{today}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(({ icon: Icon, label, value, color, bg, border }) => (
          <div key={label} className={`admin-card p-5 border ${border}`}>
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-white font-mono">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Booking trends chart */}
        <div className="lg:col-span-2 admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-white">Booking Trends</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monthly overview — last 12 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyMockData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.06)' }} />
              <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${color}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation shortcuts */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Operations Overview</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Schedules',     path: '/schedules',      color: 'text-blue-400' },
            { label: 'Flight Status', path: '/flight-status',  color: 'text-emerald-400' },
            { label: 'Gates',         path: '/gates',          color: 'text-amber-400' },
            { label: 'Airports',      path: '/airports',       color: 'text-purple-400' },
            { label: 'Reviews',       path: '/reviews',        color: 'text-rose-400' },
          ].map(({ label, path, color }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center justify-between px-4 py-3 bg-navy-700/50 hover:bg-navy-700 border border-navy-600/50 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all group"
            >
              <span className={color}>{label}</span>
              <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
