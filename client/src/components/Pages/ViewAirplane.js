import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plane } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function ViewAirplane() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/airplane/api/get/${id}`)
      .then(r => setData(r.data || {}))
      .finally(() => setLoading(false));
  }, [id]);

  const Row = ({ label, value }) => (
    <div className="py-3 grid grid-cols-2 gap-4 border-b border-navy-700 last:border-0">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-gray-100 font-mono font-medium">{value ?? <span className="text-gray-600 font-sans">—</span>}</dd>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <Link to="/airplanes" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Airplanes
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Plane size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Airplane Detail</h1>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
        </div>
        <div className="admin-card p-6">
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <dl>
              <Row label="Airplane ID" value={data.airplane_id} />
              <Row label="Maximum Seats" value={data.max_seats} />
            </dl>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
