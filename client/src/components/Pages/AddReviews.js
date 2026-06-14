import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

export default function AddReviews() {
  const [review, setReview] = useState('');
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!review.trim()) { Swal.fire('Please write a review before submitting.', '', 'warning'); return; }
    try {
      await apiClient.post(`/reviews/api/addreview/${id}`, { id, review });
      await Swal.fire('Review submitted!', 'Thank you for your feedback.', 'success');
      history.push(`/customer-panel/${id}`);
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || 'Could not submit review. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 px-4 max-w-2xl mx-auto">
        <button onClick={() => history.push(`/customer-panel/${id}`)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Star size={20} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Share Your Experience</h1>
              <p className="text-sm text-gray-500">Your feedback helps us improve our service</p>
            </div>
          </div>

          {/* Star rating (display only) */}
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(n => (
              <Star key={n} size={28} className="text-amber-400 fill-amber-400" />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review <span className="text-red-500">*</span></label>
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                rows={5}
                placeholder="Tell us about your flight experience…"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{review.length} characters</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => history.push(`/customer-panel/${id}`)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-medium transition-colors">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
