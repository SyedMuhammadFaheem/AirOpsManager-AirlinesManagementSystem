import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Navigation } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const empty = { flight_no: '', schedule_id: '', flightStatus_id: '', airplane_id: '', fares: '' };

function Field({ label, name, required, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input name={name} value={value ?? ''} onChange={onChange}
        placeholder={placeholder || label} className="admin-input" />
    </div>
  );
}

export default function AddFlight() {
  const [state, setState] = useState(empty);
  const history = useHistory();

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { flight_no, schedule_id, flightStatus_id, airplane_id, fares } = state;
    if (!flight_no || !schedule_id || !flightStatus_id || !airplane_id || fares === '') {
      toast.error('All fields are required'); return;
    }
    try {
      await apiClient.post('/flight/api/post', state);
      toast.success('Flight added successfully');
      setTimeout(() => history.push('/flights'), 400);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl">
        <button onClick={() => history.push('/flights')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Flights
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Navigation size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Add Flight</h1>
            <p className="text-xs text-gray-500">Create a new flight entry</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-card p-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3">Flight Details</p>
            <Field label="Flight Number" name="flight_no" required placeholder="e.g. FA101" value={state.flight_no} onChange={handleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Schedule ID" name="schedule_id" required placeholder="e.g. 51" value={state.schedule_id} onChange={handleChange} />
              <Field label="Flight Status ID" name="flightStatus_id" required placeholder="e.g. 61" value={state.flightStatus_id} onChange={handleChange} />
            </div>
            <Field label="Airplane ID" name="airplane_id" required placeholder="e.g. A101" value={state.airplane_id} onChange={handleChange} />
            <Field label="Fares (USD)" name="fares" required placeholder="e.g. 1500" value={state.fares} onChange={handleChange} />
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button type="button" onClick={() => history.push('/flights')} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Add Flight</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
