import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ticket, ArrowLeft, Clock } from 'lucide-react';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

const fmt = (val) => {
  if (!val) return '—';
  try { return new Date(val).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }); } catch { return val; }
};

export default function ViewCustomerTickets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/booking/showPass/${id}`)
      .then(r => setData(r.data || []))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <Link to={`/customer-panel/${id}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
            <Ticket size={18} className="text-sky-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-sm text-gray-500">{data.length} booking{data.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Ticket size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tickets found</p>
            <p className="text-sm text-gray-400 mt-1">Book a flight to see your tickets here</p>
            <Link to={`/book-ticket/${id}`} className="inline-block mt-4 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-600 transition-colors">
              Book a Flight
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Flight</p>
                    <p className="font-bold text-gray-900 font-mono">{item.flight_no}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Airport</p>
                    <p className="font-bold text-gray-900 font-mono">{item.airport_code}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center bg-gray-50 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-gray-400">Passenger</p>
                    <p className="text-sm font-medium text-gray-700">{item.fname} {item.lname}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Seat</p>
                    <p className="text-sm font-bold text-gray-900 font-mono">{item.seat_no}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Gate</p>
                    <p className="text-sm font-bold text-gray-900 font-mono">{item.gate_no}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>Departs: {fmt(item.departure_time)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
