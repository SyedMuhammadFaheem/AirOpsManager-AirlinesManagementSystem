import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Plane, Lock, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

export default function Signin() {
  const { loginAdmin } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginAdmin(username, password);
      Swal.fire({ title: 'Login Successful!', icon: 'success', timer: 1200, showConfirmButton: false });
      setTimeout(() => history.push('/admin-panel'), 500);
    } catch {
      Swal.fire('Invalid credentials', 'Please check your username and password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <Plane size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">AirOps Manager</span>
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Operations<br />Command Center
          </h1>
          <p className="text-blue-200 text-base leading-relaxed">
            Manage flights, schedules, customers, and operations from a single unified dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <Lock size={14} className="text-white/70" />
          </div>
          <span className="text-blue-300 text-sm">Secure admin access only</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="max-w-sm w-full mx-auto">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Plane size={20} className="text-brand-500" />
            <span className="font-bold text-gray-900">AirOps Manager</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Admin Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><User size={13} /> Username</span>
              </label>
              <input type="text" autoComplete="username" value={username}
                onChange={e => setUsername(e.target.value)} required
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Lock size={13} /> Password</span>
              </label>
              <input type="password" autoComplete="current-password" value={password}
                onChange={e => setPassword(e.target.value)} required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Customer?{' '}
            <Link to="/customer-signin" className="text-brand-500 font-medium hover:underline">Customer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
