import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    src: require('../../images/slide3.jpg'),
    title: 'Your Next Destination Awaits',
    sub: 'AirOps Manager connects you to hundreds of destinations worldwide — seamlessly and affordably.',
  },
  {
    src: require('../../images/slider1.jpg'),
    title: 'Discover the Wonders of the World',
    sub: 'Journey with us on a unique adventure. Book in minutes, fly in comfort.',
  },
  {
    src: require('../../images/slider2.jpg'),
    title: 'Extra Legroom, Extra Comfort',
    sub: 'Pick from a choice of extras to make every flight an experience worth remembering.',
  },
];

export default function Slider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive(i => (i - 1 + slides.length) % slides.length);
  const next = () => setActive(i => (i + 1) % slides.length);

  return (
    <div className="relative h-[520px] lg:h-[640px] overflow-hidden bg-navy-900">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 pb-16 px-6 lg:px-20 text-white">
        <h1 className="font-display text-3xl lg:text-5xl font-bold mb-3 max-w-2xl leading-tight">
          {slides[active].title}
        </h1>
        <p className="text-white/80 text-base lg:text-lg max-w-lg mb-6">{slides[active].sub}</p>
        <Link to="/book-ticket/0"
          className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-colors">
          Book a Flight
        </Link>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`rounded-full transition-all ${i === active ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}
