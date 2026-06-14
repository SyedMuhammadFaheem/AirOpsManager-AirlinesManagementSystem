import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Ticket } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const toDatetimeLocal = (val) => {
  if (!val) return '';
  try { return new Date(val).toISOString().slice(0, 16); } catch { return val; }
};

const empty = { ticket_id: '', seat_no: '', departure_time: '', gate_no: '', airport_code: '' };

export default function EditTicket() {
  const [state, setState] = useState(empty);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      apiClient.get(`/ticket/api/get/${id}`).then(r => {
        const d = r.data;
        setState({ ...d, departure_time: toDatetimeLocal(d.departure_time) });
      }).catch(() => {});
    }
  }, [id]);

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { ticket_id, seat_no, departure_time, gate_no, airport_code } = state;
    if (!ticket_id || !seat_no || !departure_time || !gate_no || !airport_code) {
      toast.error('All fields are required'); return;
    }
    try {
      await apiClient.put(`/ticket/api/update/${id}`, state);
      toast.success('Ticket updated');
      setTimeout(() => history.push('/tickets'), 400);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <button onClick={() => history.push('/tickets')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Tickets
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Ticket size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Edit Ticket</h1>
            <p className="text-xs text-gray-500">Ticket ID: {id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-card p-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3">Ticket Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Ticket ID <span className="text-red-400">*</span></label>
                <input name="ticket_id" value={state.ticket_id || ''} onChange={handleChange} className="admin-input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Seat Number <span className="text-red-400">*</span></label>
                <input name="seat_no" value={state.seat_no || ''} onChange={handleChange} placeholder="e.g. 14A" className="admin-input" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Departure Time <span className="text-red-400">*</span></label>
              <input type="datetime-local" name="departure_time" value={state.departure_time || ''} onChange={handleChange} className="admin-input" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Gate Number <span className="text-red-400">*</span></label>
                <input name="gate_no" value={state.gate_no || ''} onChange={handleChange} placeholder="e.g. G12" className="admin-input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Airport Code <span className="text-red-400">*</span></label>
                <input name="airport_code" value={state.airport_code || ''} onChange={handleChange} placeholder="e.g. KHI" className="admin-input" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button type="button" onClick={() => history.push('/tickets')} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
