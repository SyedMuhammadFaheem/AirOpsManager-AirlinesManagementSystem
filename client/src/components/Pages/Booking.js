import React, { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function Booking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/booking/get');
      setData(res.data);
    } catch { toast.error('Failed to load bookings'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const filtered = data.filter(b =>
    `${b.client_id} ${b.airport_code} ${b.ticket_id} ${b.flight_no}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = data.reduce((sum, b) => sum + Number(b.fares || 0), 0);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Bookings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {data.length} bookings · <span className="text-gold-400">${totalRevenue.toLocaleString()} total revenue</span>
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search by client, flight, or airport…" value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9" />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                {['#', 'Client ID', 'Airport', 'Ticket ID', 'Flight No', 'Fare'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider first:pl-5 last:pr-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center">
                  <BookOpen size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No bookings yet</p>
                  <p className="text-gray-600 text-xs mt-1">Bookings will appear here once customers purchase tickets</p>
                </td></tr>
              ) : filtered.map((item, i) => (
                <tr key={i} className="hover:bg-navy-700/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.client_id}</td>
                  <td className="px-4 py-3.5"><span className="badge-info">{item.airport_code}</span></td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.ticket_id}</td>
                  <td className="px-4 py-3.5 font-mono font-medium text-brand-400">{item.flight_no}</td>
                  <td className="px-5 py-3.5 text-gold-400 font-mono font-medium">${Number(item.fares).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && <div className="px-5 py-3 border-t border-navy-700 text-xs text-gray-500">Showing {filtered.length} of {data.length} bookings</div>}
      </div>
    </AdminLayout>
  );
}
