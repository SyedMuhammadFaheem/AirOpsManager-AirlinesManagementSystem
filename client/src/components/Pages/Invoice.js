import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Plane, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

const initialState = { sc_id: '', cl_id: '' };

export default function Invoice() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [paying, setPaying] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const [sc_id, cl_id] = id.split('-');
    initialState.sc_id = sc_id;
    initialState.cl_id = cl_id;
    const load = async () => {
      await apiClient.post('/UpdateFlightBooking', { id: initialState.sc_id });
      const [clientRes, faresRes] = await Promise.all([
        apiClient.get(`/invoice/${initialState.cl_id}`),
        apiClient.get('/invoicefares'),
      ]);
      setData(clientRes.data || {});
      setUser(faresRes.data || {});
    };
    load();
  }, [id]);

  const handlePay = async () => {
    setPaying(true);
    try {
      await apiClient.post('/invoiceconfirm', { id: initialState.sc_id, departure: user.departure });
      await apiClient.post('/invoiceconfirmAgain', {
        id: initialState.cl_id,
        flight_no: user.flight_no,
        fares: user.price ? parseInt(user.price.replace(/[^0-9]/g, ''), 10) : 0,
      });
      await apiClient.delete('/removeSearch');
      await Swal.fire({ title: 'Ticket Booked!', text: 'Your booking is confirmed.', icon: 'success', confirmButtonColor: '#0EA5E9' });
      history.push(`/boarding-pass/${initialState.cl_id}`);
    } catch {
      Swal.fire('Error', 'Could not complete booking. Please try again.', 'error');
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Booking Summary</h1>
          <p className="text-sm text-gray-500 mt-1">Review your flight details before payment</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Flight header */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Plane size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sky-100 text-xs">AirOps Manager</p>
                <p className="text-white font-bold">Flight Booking</p>
              </div>
            </div>
          </div>

          {/* Passenger */}
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Passenger</p>
            <p className="font-semibold text-gray-900">{data.fname || '—'} {data.lname || ''}</p>
          </div>

          {/* Amount */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Amount Due</p>
                <p className="text-3xl font-black text-gray-900">{user.price || '—'}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Includes</p>
          {['Seat reservation', 'Carry-on baggage', 'In-flight service'].map(s => (
            <div key={s} className="flex items-center gap-2 py-1.5 text-sm text-gray-600">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>

        <button onClick={handlePay} disabled={paying}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2">
          {paying ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…</>
          ) : (
            <>Confirm & Pay {user.price || ''}</>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">Secure payment · No hidden fees</p>
      </div>
    </div>
  );
}
