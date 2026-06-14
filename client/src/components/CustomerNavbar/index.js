import React, { useState } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { Plane, User, Ticket, Star, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function CustomerNavbar() {
  const { id } = useParams();
  const { logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    history.push('/customer-signin');
  };

  const links = [
    { icon: User,   label: 'Profile',      path: `/profile/${id}` },
    { icon: Plane,  label: 'Book Flight',  path: `/book-ticket/${id}` },
    { icon: Ticket, label: 'My Tickets',   path: `/my-tickets/${id}` },
    { icon: Star,   label: 'Add Review',   path: `/add-review/${id}` },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={`/customer-panel/${id}`} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <Plane size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-navy-900 text-lg tracking-tight">
              AirOps<span className="text-sky-500"> Manager</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(path)
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {links.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2 pt-4"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
