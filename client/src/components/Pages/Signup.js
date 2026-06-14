import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';

const empty = { fname: '', mname: '', lname: '', phone: '', email: '', passport: '', password: '', confirmPass: '' };

function Field({ label, name, type = 'text', placeholder, autoComplete, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input type={type} autoComplete={autoComplete} value={value} onChange={onChange}
        required placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors" />
    </div>
  );
}

export default function Signup({ history: historyProp }) {
  const historyHook = useHistory();
  const history = historyProp || historyHook;
  const [state, setState] = useState(empty);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setState(s => ({ ...s, [field]: e.target.value }));

  const register = async (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPass) {
      Swal.fire("Password doesn't match confirm password!", '', 'error');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/auth/signup', {
        fname: state.fname,
        mname: state.mname,
        lname: state.lname,
        phone: state.phone,
        email: state.email,
        passport: state.passport,
        password: state.password,
      });
      Swal.fire('Registered Successfully!', '', 'success');
      setTimeout(() => history.push('/customer-signin'), 500);
    } catch {
      Swal.fire('Error in Signup!', '', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-sky-700 via-sky-600 to-sky-400 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Plane size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">AirOps Manager</span>
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white leading-tight mb-4">
            Join AirOps<br />Manager Today
          </h1>
          <p className="text-sky-100 text-sm leading-relaxed">
            Create your account and start booking flights to destinations around the world.
          </p>
        </div>
        <p className="text-sky-200 text-xs">Already have an account? <Link to="/customer-signin" className="text-white font-semibold underline">Sign in</Link></p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <Plane size={20} className="text-sky-500" />
            <span className="font-bold text-gray-900">AirOps Manager</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in your details to get started</p>

          <form onSubmit={register} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" name="fname" placeholder="Jane" value={state.fname} onChange={set('fname')} />
              <Field label="Last Name" name="lname" placeholder="Smith" value={state.lname} onChange={set('lname')} />
            </div>
            <Field label="Middle Name" name="mname" placeholder="Doe" value={state.mname} onChange={set('mname')} />
            <Field label="Phone" name="phone" type="tel" placeholder="+923312613326" autoComplete="tel" value={state.phone} onChange={set('phone')} />
            <Field label="Email" name="email" type="email" placeholder="jane@example.com" autoComplete="email" value={state.email} onChange={set('email')} />
            <Field label="Passport Number" name="passport" placeholder="AA1234567" value={state.passport} onChange={set('passport')} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" value={state.password} onChange={set('password')} />
              <Field label="Confirm Password" name="confirmPass" type="password" placeholder="••••••••" autoComplete="new-password" value={state.confirmPass} onChange={set('confirmPass')} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/customer-signin" className="text-sky-500 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
