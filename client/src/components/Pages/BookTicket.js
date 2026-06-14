import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import apiClient from '../../api/client';
import CustomerNavbar from '../CustomerNavbar';

export default function BookTicket() {
  const history = useHistory();
  const { id } = useParams();
  const [airports, setAirports] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    apiClient.get('/airport/api/get').then(r => setAirports(r.data));
  }, []);

  const onSubmit = async (data) => {
    await apiClient.post('/BookTicket', {
      departure: data.departure,
      arrival: data.arrival,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      class: data.class,
      price: data.price,
    });
    history.push(`/available-flights/${id}`);
  };

  const FieldError = ({ msg }) => msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNavbar />
      <div className="pt-24 pb-16 px-4 max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Find a Flight</h1>
          <p className="text-sm text-gray-500 mt-1">Search for available routes</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          {/* Departure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Flying From</label>
            <div className="relative">
              <FaPlaneDeparture className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" size={16} />
              <select {...register('departure', { required: 'Departure is required' })}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.departure ? 'border-red-400' : 'border-gray-200'}`}>
                <option value="" disabled hidden>-- Select Airport --</option>
                {airports.map(a => <option key={a.airport_code} value={a.airport_name}>{a.airport_name}</option>)}
              </select>
            </div>
            <FieldError msg={errors.departure?.message} />
          </div>

          {/* Arrival */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Flying To</label>
            <div className="relative">
              <FaPlaneArrival className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" size={16} />
              <select {...register('arrival', { required: 'Arrival is required' })}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.arrival ? 'border-red-400' : 'border-gray-200'}`}>
                <option value="" disabled hidden>-- Select Airport --</option>
                {airports.map(a => <option key={a.airport_code} value={a.airport_name}>{a.airport_name}</option>)}
              </select>
            </div>
            <FieldError msg={errors.arrival?.message} />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Date</label>
              <input type="date" {...register('departureDate', { required: 'Required' })}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.departureDate ? 'border-red-400' : 'border-gray-200'}`} />
              <FieldError msg={errors.departureDate?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Return Date</label>
              <input type="date" {...register('returnDate', { required: 'Required' })}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.returnDate ? 'border-red-400' : 'border-gray-200'}`} />
              <FieldError msg={errors.returnDate?.message} />
            </div>
          </div>

          {/* Class & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
              <select {...register('class', { required: true })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>Economy</option>
                <option>Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Price</label>
              <select {...register('price', { required: true })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>All Prices</option>
                <option>$ 1000</option>
                <option>$ 2000</option>
                <option>$ 3000</option>
                <option>$ 4000</option>
                <option>$ 5000</option>
              </select>
            </div>
          </div>

          <button type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
}
