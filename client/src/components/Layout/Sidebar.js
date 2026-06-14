import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Plane, CalendarClock, Navigation,
  Activity, DoorOpen, MapPin, Star, Ticket, BookOpen, Menu, X
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/admin-panel' },
  { icon: Users,           label: 'Clients',      path: '/clients' },
  { icon: Plane,           label: 'Airplanes',    path: '/airplanes' },
  { icon: CalendarClock,   label: 'Schedules',    path: '/schedules' },
  { icon: Navigation,      label: 'Flights',      path: '/flights' },
  { icon: Activity,        label: 'Flight Status',path: '/flight-status' },
  { icon: DoorOpen,        label: 'Gates',        path: '/gates' },
  { icon: MapPin,          label: 'Airports',     path: '/airports' },
  { icon: Star,            label: 'Reviews',      path: '/reviews' },
  { icon: Ticket,          label: 'Tickets',      path: '/tickets' },
  { icon: BookOpen,        label: 'Bookings',     path: '/bookings' },
];

export default function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-navy-700">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
          <Plane size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display font-semibold text-white text-lg tracking-tight leading-none">
          AirOps<span className="text-brand-400"> Mgr</span>
        </span>
      </div>

      {/* Nav links */}
      <ul className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);
          return (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                  ${active
                    ? 'bg-brand-500/15 text-brand-400 border-l-2 border-brand-500 pl-2.5'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-navy-700 border-l-2 border-transparent'
                  }`}
              >
                <Icon size={17} className={`flex-shrink-0 ${active ? 'text-brand-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-navy-700 pt-3">
        <p className="text-xs text-gray-600 px-3">AirOpsManager v2.0</p>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-navy-800 border border-navy-700 rounded-lg text-gray-300 hover:text-white transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-in sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-navy-900 border-r border-navy-700 transform transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-60 bg-navy-900 border-r border-navy-700 z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
