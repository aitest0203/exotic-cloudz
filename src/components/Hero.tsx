import { Calendar } from 'lucide-react';
import { LOGO_SRC } from '../data/packages';
import type { View } from '../types';

interface HeroProps {
  setView: (v: View) => void;
}

export default function Hero({ setView }: HeroProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 p-4 relative group">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
          <img
            src={LOGO_SRC}
            alt="Exotic Cloudz"
            className="w-64 md:w-80 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const fallback = document.getElementById('text-logo-hero');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <h1
            id="text-logo-hero"
            className="hidden text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          >
            EXOTIC<span className="text-blue-500">CLOUDZ</span>
          </h1>
        </div>

        <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto font-light tracking-wide">
          PREMIUM MOBILE HOOKAH CATERING
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <button
            onClick={() => setView('booking')}
            className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 border border-blue-400/30"
          >
            <Calendar className="w-5 h-5" />
            BOOK RESERVATION
          </button>
          <button
            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-4 bg-black/40 hover:bg-white/10 text-white font-bold rounded-xl backdrop-blur-md transition-all border border-blue-500/30 flex items-center justify-center gap-2"
          >
            VIEW PACKAGES
          </button>
        </div>
      </div>
    </div>
  );
}
