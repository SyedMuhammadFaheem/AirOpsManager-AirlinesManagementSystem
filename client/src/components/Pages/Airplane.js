import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Plus, Plane, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function Airplane() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/airplane/api/get');
      setData(res.data);
    } catch { toast.error('Failed to load airplanes'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const delAirplane = async (id) => {
    const result = await Swal.fire({ title: 'Delete airplane?', text: `Airplane ID ${id} will be permanently removed.`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', cancelButtonText: 'Cancel' });
    if (result.isConfirmed) {
      await apiClient.delete(`/airplane/api/remove/${id}`);
      toast.success('Airplane deleted');
      loadData();
    }
  };

  const filtered = data.filter(a =>
    `${a.airplane_id} ${a.max_seats}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Airplanes</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} aircraft in fleet</p>
        </div>
        <Link to="/airplanes/new" className="btn-primary">
          <Plus size={16} />
          Add Airplane
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search by ID or capacity…" value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9" />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                {['#', 'Airplane ID', 'Max Seats', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider first:pl-5 last:pr-5 last:text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-gray-500"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-16 text-center">
                  <Plane size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No airplanes found</p>
                </td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.airplane_id} className="hover:bg-navy-700/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-3.5 text-gray-100 font-mono font-medium">{item.airplane_id}</td>
                  <td className="px-4 py-3.5">
                    <span className="badge-info">{item.max_seats} seats</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/airplanes/${item.airplane_id}`}><button className="btn-icon" title="View"><Eye size={15} /></button></Link>
                      <Link to={`/airplanes/${item.airplane_id}/edit`}><button className="btn-icon" title="Edit"><Pencil size={15} /></button></Link>
                      <button className="btn-icon hover:text-red-400" title="Delete" onClick={() => delAirplane(item.airplane_id)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && <div className="px-5 py-3 border-t border-navy-700 text-xs text-gray-500">Showing {filtered.length} of {data.length} airplanes</div>}
      </div>
    </AdminLayout>
  );
}
