import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plane, ArrowLeft } from 'lucide-react';
import apiClient from '../../api/client';

const fmt = (val) => {
  if (!val) return '—';
  try { return new Date(val).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }); } catch { return val; }
};

export default function BoardingPass() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/booking/showPass/${id}`)
      .then(r => setData(r.data[0] || {}))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <Link to={`/customer-panel/${id}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="w-full">
            {/* Main ticket */}
            <div className="bg-gradient-to-br from-sky-600 to-navy-900 rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Plane size={14} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide">AirOps Manager</span>
                  </div>
                  <span className="text-sky-200 text-xs uppercase tracking-widest font-medium">Boarding Pass</span>
                </div>

                {/* Airport code big display */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white font-mono">{data.airport_code || '—'}</div>
                    <div className="text-sky-200 text-xs mt-1">Departure</div>
                  </div>
                  <div className="flex-1 flex items-center gap-1 px-2">
                    <div className="flex-1 border-t border-white/20" />
                    <Plane size={16} className="text-white/60" />
                    <div className="flex-1 border-t border-white/20" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-white font-mono">ARR</div>
                    <div className="text-sky-200 text-xs mt-1">Arrival</div>
                  </div>
                </div>
              </div>

              {/* Divider with circles */}
              <div className="relative flex items-center">
                <div className="w-5 h-5 bg-slate-900 rounded-full -ml-2.5" />
                <div className="flex-1 border-t-2 border-dashed border-white/20" />
                <div className="w-5 h-5 bg-slate-900 rounded-full -mr-2.5" />
              </div>

              {/* Details grid */}
              <div className="px-6 py-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sky-300 text-xs uppercase tracking-wider mb-0.5">Passenger</p>
                  <p className="text-white font-bold text-sm">{data.fname || '—'} {data.lname || ''}</p>
                </div>
                <div>
                  <p className="text-sky-300 text-xs uppercase tracking-wider mb-0.5">Flight No.</p>
                  <p className="text-white font-bold text-sm font-mono">{data.flight_no || '—'}</p>
                </div>
                <div>
                  <p className="text-sky-300 text-xs uppercase tracking-wider mb-0.5">Gate</p>
                  <p className="text-white font-bold text-lg font-mono">{data.gate_no || '—'}</p>
                </div>
                <div>
                  <p className="text-sky-300 text-xs uppercase tracking-wider mb-0.5">Seat</p>
                  <p className="text-white font-bold text-lg font-mono">{data.seat_no || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sky-300 text-xs uppercase tracking-wider mb-0.5">Boarding Time</p>
                  <p className="text-white font-semibold text-sm">{fmt(data.departure_time)}</p>
                </div>
              </div>

              {/* Barcode placeholder */}
              <div className="px-6 pb-6">
                <div className="bg-white rounded-xl p-3 flex items-center justify-center gap-0.5 h-14">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="bg-gray-900 rounded-sm"
                      style={{ width: i % 3 === 0 ? 3 : 1.5, height: i % 5 === 0 ? 36 : 28 }} />
                  ))}
                </div>
                <p className="text-center text-sky-300 text-xs mt-2 font-mono tracking-widest">
                  {data.flight_no || 'XXXXXXXX'} {data.seat_no || 'XX'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
