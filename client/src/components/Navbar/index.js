import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, ChevronDown } from 'lucide-react';

const links = [
  { label: 'View Flights', path: '/book-ticket' },
  { label: 'About',        path: '/about' },
  { label: 'Contact',      path: '/contact-us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setClientOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || mobileOpen
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-navy-700 shadow-lg'
          : 'bg-navy-900/80 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Plane size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">
              AirOps<span className="text-brand-400"> Manager</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(path)
                    ? 'text-white bg-navy-700'
                    : 'text-gray-400 hover:text-white hover:bg-navy-800'
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Client Login dropdown */}
            <div className="relative">
              <button
                onClick={() => setClientOpen(!clientOpen)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg transition-all"
              >
                Customer Login
                <ChevronDown size={14} className={`transition-transform ${clientOpen ? 'rotate-180' : ''}`} />
              </button>
              {clientOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-navy-800 border border-navy-600 rounded-xl shadow-card overflow-hidden animate-fade-in">
                  <Link to="/sign-up" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-navy-700 transition-colors">
                    Sign Up
                  </Link>
                  <Link to="/customer-signin" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-navy-700 transition-colors border-t border-navy-700">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/signin"
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700 px-4 py-4 space-y-1 animate-fade-in">
          {links.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-navy-700 space-y-2">
            <Link to="/sign-up" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 transition-colors">
              Customer Sign Up
            </Link>
            <Link to="/customer-signin" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 transition-colors">
              Customer Sign In
            </Link>
            <Link to="/signin" className="block px-4 py-3 rounded-lg text-sm font-medium text-center bg-brand-500 hover:bg-brand-600 text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
