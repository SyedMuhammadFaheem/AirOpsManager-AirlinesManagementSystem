import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, CalendarClock } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const toDatetimeLocal = (val) => {
  if (!val) return '';
  try { return new Date(val).toISOString().slice(0, 16); } catch { return val; }
};

const empty = { schedule_id: '', departure_time: '', arrival_time: '', duration_time: '' };

export default function AddEditSchedule() {
  const [state, setState] = useState(empty);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      apiClient.get(`/schedule/api/get/${id}`).then(r => {
        const d = r.data;
        setState({ ...d, departure_time: toDatetimeLocal(d.departure_time), arrival_time: toDatetimeLocal(d.arrival_time) });
      }).catch(() => {});
    }
  }, [id]);

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!state.schedule_id || !state.departure_time || !state.arrival_time) {
      toast.error('Schedule ID, departure and arrival times are required'); return;
    }
    try {
      if (!id) await apiClient.post('/schedule/api/post', state);
      else await apiClient.put(`/schedule/api/update/${id}`, state);
      toast.success(id ? 'Schedule updated' : 'Schedule added');
      setTimeout(() => history.push('/schedules'), 400);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <button onClick={() => history.push('/schedules')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Schedules
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <CalendarClock size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{id ? 'Edit Schedule' : 'Add Schedule'}</h1>
            <p className="text-xs text-gray-500">{id ? `Editing schedule ID ${id}` : 'Create a new flight schedule'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-card p-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3">Schedule Details</p>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Schedule ID <span className="text-red-400">*</span></label>
              <input name="schedule_id" value={state.schedule_id || ''} onChange={handleChange} placeholder="Unique schedule ID" className="admin-input" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Departure Time <span className="text-red-400">*</span></label>
                <input type="datetime-local" name="departure_time" value={state.departure_time || ''} onChange={handleChange} className="admin-input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Arrival Time <span className="text-red-400">*</span></label>
                <input type="datetime-local" name="arrival_time" value={state.arrival_time || ''} onChange={handleChange} className="admin-input" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Duration</label>
              <input name="duration_time" value={state.duration_time || ''} onChange={handleChange} placeholder="e.g. 2h 30m" className="admin-input" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button type="button" onClick={() => history.push('/schedules')} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">{id ? 'Save Changes' : 'Add Schedule'}</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
