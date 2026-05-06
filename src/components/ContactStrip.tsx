import { Phone, Instagram, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS } from '../data/business';

export default function ContactStrip() {
  return (
    <section id="contact" className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Get In Touch</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <a
          href={`tel:${BUSINESS.phoneDigits}`}
          className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-green-500 hover:bg-gray-900/90 transition-all backdrop-blur-sm group"
        >
          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
            <Phone className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Call or Text</div>
            <div className="text-white font-bold">{BUSINESS.phoneDisplay}</div>
          </div>
        </a>

        <a
          href={BUSINESS.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-pink-500 hover:bg-gray-900/90 transition-all backdrop-blur-sm group"
        >
          <div className="bg-pink-500/10 p-3 rounded-lg border border-pink-500/20 group-hover:bg-pink-500/20 transition-colors">
            <Instagram className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Instagram</div>
            <div className="text-white font-bold">@{BUSINESS.instagramHandle}</div>
          </div>
        </a>

        <a
          href={`mailto:${BUSINESS.email}`}
          className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-blue-500 hover:bg-gray-900/90 transition-all backdrop-blur-sm group"
        >
          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Email</div>
            <div className="text-white font-bold break-all">{BUSINESS.email}</div>
          </div>
        </a>

        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex items-center gap-4 backdrop-blur-sm">
          <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
            <MapPin className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Service Area</div>
            <div className="text-white font-bold">{BUSINESS.serviceArea}</div>
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex items-center gap-4 backdrop-blur-sm">
          <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Hours</div>
            <div className="text-white font-bold">{BUSINESS.hoursDisplay}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
