import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Users } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

const empty = { client_id: '', fname: '', mname: '', lname: '', phone: '', email: '', passport: '', password: '' };

function Field({ label, name, type = 'text', required, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input type={type} name={name} value={value ?? ''} onChange={onChange}
        placeholder={placeholder || label}
        className="admin-input" />
    </div>
  );
}

export default function AddEditClient() {
  const [state, setState] = useState(empty);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) apiClient.get(`/api/get/${id}`).then(r => setState({ ...r.data })).catch(() => {});
  }, [id]);

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { client_id, fname, lname, phone, email, passport, password } = state;
    if (!client_id || !fname || !lname || !phone || !email || !passport) {
      toast.error('Please fill all required fields'); return;
    }
    if (!id && !password) {
      toast.error('Password is required for new clients'); return;
    }
    try {
      if (!id) await apiClient.post('/api/post', state);
      else await apiClient.put(`/api/update/${id}`, state);
      toast.success(id ? 'Client updated' : 'Client added');
      setTimeout(() => history.push('/clients'), 400);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <button onClick={() => history.push('/clients')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Clients
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-brand-500/15 rounded-lg flex items-center justify-center">
            <Users size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{id ? 'Edit Client' : 'Add New Client'}</h1>
            <p className="text-xs text-gray-500">{id ? `Editing client ID ${id}` : 'Register a new passenger'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-card p-6 space-y-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" name="fname" required value={state.fname} onChange={handleChange} />
              <Field label="Last Name" name="lname" required value={state.lname} onChange={handleChange} />
              <Field label="Middle Name" name="mname" value={state.mname} onChange={handleChange} />
              <Field label="Client ID" name="client_id" required placeholder="Unique ID" value={state.client_id} onChange={handleChange} />
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-navy-700 pb-3 pt-2">Contact & Identity</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone" name="phone" type="tel" required value={state.phone} onChange={handleChange} />
              <Field label="Email" name="email" type="email" required value={state.email} onChange={handleChange} />
              <Field label="Passport Number" name="passport" required value={state.passport} onChange={handleChange} />
              {!id && <Field label="Password" name="password" type="password" required placeholder="Min 6 characters" value={state.password} onChange={handleChange} />}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-5">
            <button type="button" onClick={() => history.push('/clients')} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {id ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
