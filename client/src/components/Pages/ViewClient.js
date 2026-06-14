import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Users } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function ViewClient() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/api/get/${id}`)
      .then(r => setUser(r.data || {}))
      .finally(() => setLoading(false));
  }, [id]);

  const Row = ({ label, value }) => (
    <div className="py-3 grid grid-cols-2 gap-4 border-b border-navy-700 last:border-0">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-gray-100 font-medium">{value || <span className="text-gray-600">—</span>}</dd>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <Link to="/clients" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Clients
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-brand-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Client Detail</h1>
              <p className="text-xs text-gray-500">ID: {id}</p>
            </div>
          </div>
          <Link to={`/clients/${id}/edit`} className="btn-ghost">
            <Pencil size={14} /> Edit
          </Link>
        </div>

        <div className="admin-card p-6">
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <dl>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Personal Information</p>
              <Row label="First Name" value={user.fname} />
              <Row label="Middle Name" value={user.mname} />
              <Row label="Last Name" value={user.lname} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-3">Contact & Identity</p>
              <Row label="Phone" value={user.phone} />
              <Row label="Email" value={user.email} />
              <Row label="Passport" value={user.passport} />
            </dl>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
