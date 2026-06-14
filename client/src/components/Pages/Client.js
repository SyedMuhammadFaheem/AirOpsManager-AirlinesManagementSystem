import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Plus, Users, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function Client() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/get');
      setData(res.data);
    } catch { toast.error('Failed to load clients'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const delClient = async (id) => {
    const result = await Swal.fire({ title: 'Delete client?', text: `Client ID ${id} will be permanently removed.`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', cancelButtonText: 'Cancel' });
    if (result.isConfirmed) {
      await apiClient.delete(`/api/remove/${id}`);
      toast.success('Client deleted');
      loadData();
    }
  };

  const filtered = data.filter(c =>
    `${c.fname} ${c.lname} ${c.email} ${c.client_id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} registered passengers</p>
        </div>
        <Link to="/clients/new" className="btn-primary">
          <Plus size={16} />
          Add Client
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email or ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input pl-9"
        />
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                {['#', 'Client ID', 'Name', 'Phone', 'Email', 'Passport', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider first:pl-5 last:pr-5 last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-500">
                  <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-16 text-center">
                  <Users size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No clients found</p>
                  <p className="text-gray-600 text-xs mt-1">Add a client to get started</p>
                </td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.client_id} className="hover:bg-navy-700/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.client_id}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-medium text-gray-100">{item.fname} {item.mname} {item.lname}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400">{item.phone}</td>
                  <td className="px-4 py-3.5 text-gray-400">{item.email}</td>
                  <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{item.passport}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/clients/${item.client_id}`}><button className="btn-icon" title="View"><Eye size={15} /></button></Link>
                      <Link to={`/clients/${item.client_id}/edit`}><button className="btn-icon" title="Edit"><Pencil size={15} /></button></Link>
                      <button className="btn-icon hover:text-red-400" title="Delete" onClick={() => delClient(item.client_id)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-navy-700 text-xs text-gray-500">
            Showing {filtered.length} of {data.length} clients
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
