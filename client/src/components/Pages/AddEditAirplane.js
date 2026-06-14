import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Plane } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const empty = { airplane_id: '', max_seats: '' };

export default function AddEditAirplane() {
  const [state, setState] = useState(empty);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) apiClient.get(`/airplane/api/get/${id}`).then(r => setState({ ...r.data })).catch(() => {});
  }, [id]);

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!state.airplane_id || !state.max_seats) { toast.error('All fields are required'); return; }
    try {
      if (!id) await apiClient.post('/airplane/api/post', state);
      else await apiClient.put(`/airplane/api/update/${id}`, state);
      toast.success(id ? 'Airplane updated' : 'Airplane added');
      setTimeout(() => history.push('/airplanes'), 400);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl">
        <button onClick={() => history.push('/airplanes')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Airplanes
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Plane size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{id ? 'Edit Airplane' : 'Add Airplane'}</h1>
            <p className="text-xs text-gray-500">{id ? `Editing airplane ID ${id}` : 'Register a new aircraft'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-card p-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3">Aircraft Details</p>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Airplane ID <span className="text-red-400">*</span></label>
              <input name="airplane_id" value={state.airplane_id || ''} onChange={handleChange} placeholder="e.g. A101" className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Maximum Seats <span className="text-red-400">*</span></label>
              <input type="number" name="max_seats" value={state.max_seats || ''} onChange={handleChange} placeholder="e.g. 180" className="admin-input" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button type="button" onClick={() => history.push('/airplanes')} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">{id ? 'Save Changes' : 'Add Airplane'}</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
