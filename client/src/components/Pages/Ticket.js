import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Ticket as TicketIcon, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function Ticket() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/ticket/api/get');
      setData(res.data);
    } catch { toast.error('Failed to load tickets'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const fmt = (dt) => dt ? new Date(dt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  const filtered = data.filter(t =>
    `${t.ticket_id} ${t.seat_no} ${t.airport_code} ${t.gate_no}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Tickets</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} tickets issued</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search by ticket ID, seat, or airport…" value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9" />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                {['#', 'Ticket ID', 'Seat', 'Departure', 'Gate', 'Airport', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider first:pl-5 last:pr-5 last:text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-16 text-center">
                  <TicketIcon size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No tickets found</p>
                </td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.ticket_id} className="hover:bg-navy-700/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-3.5 font-mono font-medium text-brand-400">{item.ticket_id}</td>
                  <td className="px-4 py-3.5"><span className="badge-info">{item.seat_no}</span></td>
                  <td className="px-4 py-3.5 text-gray-300 text-xs">{fmt(item.departure_time)}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono">{item.gate_no}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono">{item.airport_code}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/tickets/${item.ticket_id}`}><button className="btn-icon" title="View"><Eye size={15} /></button></Link>
                      <Link to={`/tickets/edit/${item.ticket_id}`}><button className="btn-icon" title="Edit"><Pencil size={15} /></button></Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && <div className="px-5 py-3 border-t border-navy-700 text-xs text-gray-500">Showing {filtered.length} of {data.length} tickets</div>}
      </div>
    </AdminLayout>
  );
}
