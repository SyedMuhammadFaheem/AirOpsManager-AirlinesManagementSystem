import React from 'react';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <Sidebar />
      {/* Main content — offset by sidebar width on desktop */}
      <main className="lg:ml-60 min-h-screen">
        <div className="p-6 lg:p-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
