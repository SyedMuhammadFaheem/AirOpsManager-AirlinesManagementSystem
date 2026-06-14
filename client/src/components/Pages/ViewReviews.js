import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import apiClient from '../../api/client';
import AdminLayout from '../Layout/AdminLayout';

export default function ViewReviews() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/reviews/api/get/${id}`)
      .then(r => setData(r.data[0] || {}))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <Link to="/reviews" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
          <ArrowLeft size={15} /> Back to Reviews
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-gold-500/15 rounded-lg flex items-center justify-center">
            <Star size={18} className="text-gold-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Review Detail</h1>
            <p className="text-xs text-gray-500">Client ID: {id}</p>
          </div>
        </div>
        <div className="admin-card p-6">
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <dl>
              <div className="py-3 grid grid-cols-2 gap-4 border-b border-navy-700">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</dt>
                <dd className="text-sm text-gray-100 font-mono font-medium">{data.client_id || id}</dd>
              </div>
              <div className="py-4">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Review</dt>
                <dd className="text-sm text-gray-200 leading-relaxed bg-navy-700/50 rounded-lg p-4">
                  {data.review || <span className="text-gray-600 italic">No review content</span>}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
