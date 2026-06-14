import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Star, Globe } from 'lucide-react';
import Slider from './Slider';
import Footer from './Footer';
import SEO from '../SEO';

const features = [
  {
    icon: Globe,
    title: 'Global Route Network',
    desc: 'Manage routes across hundreds of destinations worldwide with real-time schedule visibility and capacity planning.',
    img: require('../../images/Destinations_Dekstop.png'),
  },
  {
    icon: Zap,
    title: 'Instant Booking Engine',
    desc: 'Customers search, book, and receive boarding passes in minutes — no phone calls, no paper, no queues.',
    img: require('../../images/Fasttrack_Desktop.jpg'),
  },
  {
    icon: Shield,
    title: 'Operational Control',
    desc: 'From gate assignments to flight status tracking, every operation managed under one unified dashboard.',
    img: require('../../images/Alfursan_Destop.jpg'),
  },
];

const highlights = [
  {
    title: 'End-to-End Flight Management',
    desc: 'Create schedules, assign gates, manage aircraft, and track flight status — all from a single system with live data.',
    img: require('../../images/Large-Sustainability.jpg'),
  },
  {
    title: 'Real-Time Passenger Experience',
    desc: 'Customers get boarding passes, invoices, and ticket history in their own portal — zero paper, zero friction.',
    img: require('../../images/Large-experiences.jpg'),
  },
  {
    title: 'Analytics-Driven Decisions',
    desc: 'Live KPIs, booking trends, and revenue tracking give your operations team the data they need to act fast.',
    img: require('../../images/Large-Upgrade.jpg'),
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Airline Operations Management System"
        description="AirOpsManager is an all-in-one airline operations platform. Manage flights, schedules, bookings, gates, and passengers from a single unified dashboard. Book flights instantly."
        path="/"
      />
      <Slider />

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Built for Aviation Operations</h2>
          <p className="text-gray-500">Every tool your team needs — scheduling, booking, and ops in one place</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, img }) => (
            <div key={title} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={img} alt={title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-sky-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exceptional experiences */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">
                Manage More,<br />Stress Less
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                AirOps Manager gives your team a single platform to handle every aspect of airline operations — from scheduling to customer boarding.
              </p>
              <div className="flex items-center gap-3">
                {[Shield, Star, Zap].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-sky-500" />
                  </div>
                ))}
                <span className="text-sm text-gray-500 ml-1">Safety · Comfort · Speed</span>
              </div>
            </div>
            <div className="space-y-4">
              {highlights.map(({ title, desc, img }) => (
                <div key={title} className="flex gap-4 items-start bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <img src={img} alt={title} className="w-24 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-sky-600 to-navy-900 py-20 text-center text-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">
            Ready to Streamline Your Operations?
          </h2>
          <p className="text-sky-100 mb-8 text-base">
            Join the airlines and operators already running smarter with AirOps Manager.
          </p>
          <Link to="/book-ticket"
            className="inline-block px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors text-sm">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
