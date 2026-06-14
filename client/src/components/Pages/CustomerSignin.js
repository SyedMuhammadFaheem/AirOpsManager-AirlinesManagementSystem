import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Plane, Lock, Mail } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

export default function CustomerSignin() {
  const { loginCustomer } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginCustomer(email, password);
      Swal.fire({ title: 'Login Successful!', icon: 'success', timer: 1200, showConfirmButton: false });
      setTimeout(() => history.push(`/customer-panel/${user.client_id}`), 500);
    } catch {
      Swal.fire('Invalid credentials', 'Please check your email and password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-700 via-sky-600 to-sky-500 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Plane size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">AirOps Manager</span>
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Your Journey<br />Awaits You
          </h1>
          <p className="text-sky-100 text-base leading-relaxed">
            Book flights, manage your tickets, and track your travel history — all in one place.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Book Flights', 'View Tickets', 'Manage Profile', 'Boarding Pass'].map(f => (
            <div key={f} className="bg-white/10 rounded-xl px-3 py-2 text-white/80 text-sm">{f}</div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="max-w-sm w-full mx-auto">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Plane size={20} className="text-sky-500" />
            <span className="font-bold text-gray-900">AirOps Manager</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to access your travel dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Mail size={13} /> Email Address</span>
              </label>
              <input type="email" autoComplete="email" value={email}
                onChange={e => setEmail(e.target.value)} required
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Lock size={13} /> Password</span>
              </label>
              <input type="password" autoComplete="current-password" value={password}
                onChange={e => setPassword(e.target.value)} required
                placeholder="Your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            New customer?{' '}
            <Link to="/sign-up" className="text-sky-500 font-medium hover:underline">Create an account</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Admin?{' '}
            <Link to="/signin" className="text-gray-700 font-medium hover:underline">Admin login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
