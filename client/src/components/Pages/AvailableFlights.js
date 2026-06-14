import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plane, Clock, ArrowRight } from 'lucide-react';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

const initialState = { fb_id: '', departure: '', arrival: '', departureDate: '', returnDate: '', class: '', price: '' };

const fmt = (val) => {
  if (!val) return '—';
  try { return new Date(val).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }); } catch { return val; }
};

export default function AvailableFlights() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/SearchFlights');
      const s = response.data[0];
      if (!s) { setLoading(false); return; }
      initialState.fb_id = s.fb_id;
      initialState.departure = s.departure;
      initialState.arrival = s.arrival;
      initialState.departureDate = s.departureDate;
      initialState.returnDate = s.returnDate;
      initialState.class = s.class;
      initialState.price = s.price;
      const faresNumeric = parseInt(initialState.price.replace(/[^0-9]/g, ''), 10);
      const ret = await apiClient.post('/AvailableFlights', {
        departureDate: initialState.departureDate,
        returnDate: initialState.returnDate,
        fares: isNaN(faresNumeric) ? 0 : faresNumeric,
      });
      setData(ret.data);
      setLoading(false);
    };
    load().catch(() => setLoading(false));
  }, []);

  const statusClass = (s) => {
    if (!s) return 'text-gray-500';
    const l = s.toLowerCase();
    if (l === 'on time') return 'text-green-600 bg-green-50';
    if (l === 'delayed') return 'text-amber-600 bg-amber-50';
    if (l === 'cancelled') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Available Flights</h1>
          <p className="text-sm text-gray-500 mt-1">{data.length} flight{data.length !== 1 ? 's' : ''} found</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Plane size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No flights available</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                        <Plane size={14} className="text-sky-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Airplane</p>
                        <p className="text-sm font-semibold text-gray-900 font-mono">{item.airplane_id}</p>
                      </div>
                      <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-400">Departure</p>
                        <p className="font-medium text-gray-800">{fmt(item.departure_time)}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Arrival</p>
                        <p className="font-medium text-gray-800">{fmt(item.arrival_time)}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{item.max_seats} seats</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sky-600 font-semibold text-sm">$ {item.fares}</span>
                    </div>
                  </div>
                  <Link
                    to={id > 0 ? `/invoice/${item.schedule_id}-${id}` : '/customer-signin'}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${id > 0 ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                    {id > 0 ? 'Book' : 'Login'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
