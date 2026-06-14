import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const statusBadge = (s) => {
  if (!s) return null;
  const lower = s.toLowerCase();
  if (lower === 'on time') return <span className="badge-success">{s}</span>;
  if (lower === 'delayed') return <span className="badge-warning">{s}</span>;
  if (lower === 'cancelled') return <span className="badge-danger">{s}</span>;
  return <span className="badge-info">{s}</span>;
};

export default function ViewFlightStatus() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/flightStatus/api/get/${id}`)
      .then(r => setData(r.data || {}))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <Link to="/flight-status" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Flight Status
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Activity size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Flight Status Detail</h1>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
        </div>
        <div className="admin-card p-6">
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <dl>
              <div className="py-3 grid grid-cols-2 gap-4 border-b border-navy-700">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Status ID</dt>
                <dd className="text-sm text-gray-100 font-mono font-medium">{data.flightStatus_id || id}</dd>
              </div>
              <div className="py-3 grid grid-cols-2 gap-4">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</dt>
                <dd className="text-sm font-medium">{statusBadge(data.status) || <span className="text-gray-600">—</span>}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
