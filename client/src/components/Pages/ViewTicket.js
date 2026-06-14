import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Ticket } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const fmt = (val) => {
  if (!val) return '—';
  try { return new Date(val).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }); } catch { return val; }
};

export default function ViewTicket() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/ticket/api/get/${id}`)
      .then(r => setData(r.data || {}))
      .finally(() => setLoading(false));
  }, [id]);

  const Row = ({ label, value, mono }) => (
    <div className="py-3 grid grid-cols-2 gap-4 border-b border-navy-700 last:border-0">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className={`text-sm text-gray-100 font-medium ${mono ? 'font-mono' : ''}`}>{value || <span className="text-gray-600">—</span>}</dd>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <Link to="/tickets" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Tickets
        </Link>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
              <Ticket size={18} className="text-brand-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Ticket Detail</h1>
              <p className="text-xs text-gray-500">ID: {id}</p>
            </div>
          </div>
          <Link to={`/tickets/edit/${id}`} className="btn-ghost"><Pencil size={14} /> Edit</Link>
        </div>
        <div className="admin-card p-6">
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <dl>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Seat & Timing</p>
              <Row label="Ticket ID" value={data.ticket_id} mono />
              <Row label="Seat Number" value={data.seat_no} mono />
              <Row label="Departure Time" value={fmt(data.departure_time)} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-3">Location</p>
              <Row label="Gate Number" value={data.gate_no} mono />
              <Row label="Airport Code" value={data.airport_code} mono />
            </dl>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
