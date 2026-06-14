import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plane size={18} className="text-sky-400" />
              <span className="text-white font-bold">AirOps Manager</span>
            </div>
            <p className="text-sm leading-relaxed">Powering aviation operations — scheduling, booking, and fleet management in one place.</p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/book-ticket/0" className="hover:text-white transition-colors">Book a Flight</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>1 World Trade Center, New York, NY</li>
              <li>+1 (212) 470-3000</li>
              <li>Mon–Sat 8:00am–4:30pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © 2026 AirOps Manager. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
