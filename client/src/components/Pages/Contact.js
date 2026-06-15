import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import Footer from './Footer';
import SEO from '../SEO';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = f => e => setForm(s => ({ ...s, [f]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the AirOpsManager team. Reach us at 1 World Trade Center, New York or send a message online. We respond within 24 hours."
        path="/contact-us"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-sky-700 text-white py-20 text-center">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-3">Contact Us</h1>
        <p className="text-sky-200 text-lg max-w-xl mx-auto">We'd love to hear from you. Get in touch with our team.</p>
      </section>

      {/* Info + Form */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: info + image */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">How to Find Us</h2>
            <p className="text-gray-500 mb-8">Address and directions to our office</p>
            <div className="rounded-2xl overflow-hidden shadow-md mb-8">
              <img src={require('../../images/contact.jpg')} alt="AirOps Manager office" className="w-full h-56 object-cover" />
            </div>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Our Address</p>
                  <p className="text-gray-500 text-sm">1 World Trade Center, New York, NY 10007</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Phone</p>
                  <p className="text-gray-500 text-sm">+1 (212) 470-3000</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Open Hours</p>
                  <p className="text-gray-500 text-sm">Mon–Sat 8:00am–4:30pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-500 mb-8">We'll get back to you within 24 hours</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input type="text" value={form.name} onChange={set('name')} required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={set('email')} required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea value={form.message} onChange={set('message')} required rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                {sent ? '✓ Message Sent!' : <><Send size={14} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <iframe
            src="https://maps.google.com/maps?width=600px&height=400px&hl=en&q=1+World+Trade+Center,+New+York,+NY+10007&t=&z=15&ie=UTF8&iwloc=B&output=embed"
            className="w-full"
            height="400"
            loading="lazy"
            title="AirOps Manager headquarters"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
