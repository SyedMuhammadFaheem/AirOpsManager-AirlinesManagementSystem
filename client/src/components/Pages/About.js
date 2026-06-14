import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Award } from 'lucide-react';
import apiClient from '../../api/client';
import Footer from './Footer';

export default function About() {
  const [reviews, setReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    apiClient.get('/reviews/api/getreview').then(r => setReviews(r.data.slice(0, 3)));
  }, []);

  useEffect(() => {
    if (reviews.length < 2) return;
    const t = setInterval(() => setActiveReview(i => (i + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, [reviews]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-sky-700 text-white py-20 text-center">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-3">About AirOps Manager</h1>
        <p className="text-sky-200 text-lg max-w-xl mx-auto">Our goals, values, and commitment to exceptional travel experiences.</p>
      </section>

      {/* Mission section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img src={require('../../images/airhostess.jpg')} alt="AirOps Manager crew" className="w-full h-96 object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">About Our Platform</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              AirOps Manager is a complete aviation operations platform built for airlines and operators who need to manage scheduling, bookings, fleet, and customer experience from one unified system.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={18} className="text-sky-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Mission</h3>
                  <p className="text-gray-600 text-sm">To make aviation operations simple, transparent, and efficient for every team that runs them.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-sky-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Team &amp; Technology</h3>
                  <p className="text-gray-600 text-sm">A dedicated engineering and operations team keeping your platform reliable, secure, and always up to date.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Win section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 leading-tight mb-4">
                Built to Power Modern Aviation Operations
              </h2>
              <p className="text-gray-600">AirOps Manager gives airlines and operators a complete toolkit — from scheduling and fleet management to customer bookings and real-time status tracking.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={require('../../images/about1.jpg')} alt="Trip of a lifetime" className="w-full h-72 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews carousel */}
      {reviews.length > 0 && (
        <section className="py-16 text-center bg-white">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Our Happy Clients</h2>
            <p className="text-gray-500 mb-10">What people say about us</p>
            <div className="relative min-h-[100px]">
              {reviews.map((r, i) => (
                <div key={i} className={`transition-opacity duration-500 ${i === activeReview ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                  <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                    "{r.review}"
                  </blockquote>
                  <p className="text-sm font-semibold text-gray-900 mt-4">{r.fname} {r.lname}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActiveReview(i)}
                  className={`rounded-full transition-all ${i === activeReview ? 'w-6 h-2 bg-sky-500' : 'w-2 h-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video + comfort section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <video className="w-full h-72 object-cover" autoPlay loop muted playsInline>
                <source src={require('../../images/InsideTheWorldsBiggestPassengerPlane.mp4')} type="video/mp4" />
              </video>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Operational Excellence, Inside and Out</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                From the control room to the boarding gate, AirOps Manager ensures every part of your operation is connected, visible, and running on time.
              </p>
              <Link to="/contact-us" className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-colors">
                More Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
