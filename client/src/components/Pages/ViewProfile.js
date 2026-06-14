import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, ArrowLeft, Mail, Phone, CreditCard } from 'lucide-react';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

export default function ViewProfile() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/profile/${id}`)
      .then(r => setData(r.data || {}))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={14} className="text-sky-500" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-lg mx-auto">
        <Link to={`/customer-panel/${id}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-700 px-6 py-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <User size={36} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                {data.fname} {data.mname ? `${data.mname} ` : ''}{data.lname}
              </h1>
              <p className="text-sky-200 text-sm mt-1">Customer ID: {id}</p>
            </div>

            {/* Details */}
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact Information</p>
              <Row icon={Mail} label="Email Address" value={data.email} />
              <Row icon={Phone} label="Phone Number" value={data.phone} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Travel Documents</p>
              <Row icon={CreditCard} label="Passport Number" value={data.passport} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
