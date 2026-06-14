import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Plus, Navigation, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function Flight() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/flight/api/get');
      setData(res.data);
    } catch { toast.error('Failed to load flights'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const delFlight = async (id) => {
    const result = await Swal.fire({ title: 'Delete flight?', text: `Flight ${id} will be permanently removed.`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', cancelButtonText: 'Cancel' });
    if (result.isConfirmed) {
      await apiClient.delete(`/flight/api/remove/${id}`);
      toast.success('Flight deleted');
      loadData();
    }
  };

  const filtered = data.filter(f =>
    `${f.flight_no} ${f.schedule_id} ${f.airplane_id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Flights</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} flights in system</p>
        </div>
        <Link to="/flights/new" className="btn-primary">
          <Plus size={16} />
          Add Flight
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search by flight number…" value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9" />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                {['#', 'Flight No', 'Schedule ID', 'Status ID', 'Airplane ID', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider first:pl-5 last:pr-5 last:text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center">
                  <Navigation size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No flights found</p>
                </td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.flight_no} className="hover:bg-navy-700/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-3.5 font-mono font-semibold text-brand-400">{item.flight_no}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.schedule_id}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.flightStatus_id}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.airplane_id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/flights/${item.flight_no}`}><button className="btn-icon" title="View"><Eye size={15} /></button></Link>
                      <button className="btn-icon hover:text-red-400" title="Delete" onClick={() => delFlight(item.flight_no)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && <div className="px-5 py-3 border-t border-navy-700 text-xs text-gray-500">Showing {filtered.length} of {data.length} flights</div>}
      </div>
    </AdminLayout>
  );
}
