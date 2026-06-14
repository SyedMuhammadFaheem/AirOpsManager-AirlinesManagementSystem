import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6">
        <Plane size={32} className="text-brand-400 rotate-45" />
      </div>
      <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-3">404</p>
      <h1 className="text-3xl font-display font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-gray-400 text-sm max-w-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>
    </div>
  );
}
