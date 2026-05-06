import type { FormEvent } from 'react';
import { Clock, MapPin, CheckCircle, Droplet } from 'lucide-react';
import { PACKAGES } from '../data/packages';
import type { FormData } from '../types';

interface BookingFlowProps {
  step: number;
  setStep: (n: number) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function BookingFlow({
  step,
  setStep,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
}: BookingFlowProps) {
  const handlePackageSelect = (pkgId: string) => {
    setFormData({ ...formData, package: pkgId });
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleDateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">Reservation</h2>
        <div className="text-sm text-blue-400 font-mono border border-blue-500/30 px-3 py-1 rounded-full bg-blue-900/20">
          STEP {step}/3
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-blue-200 mb-4">Select your experience level:</p>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              className="group relative bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-blue-500 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-black/50 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors border border-white/5">
                  {pkg.icon}
                </div>
                <span className="text-2xl font-bold text-white">{pkg.price}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
              <ul className="space-y-2">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleDateSubmit} className="space-y-6 animate-fade-in">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-500" />
              Time &amp; Date
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Event Date</label>
                <input
                  type="date"
                  required
                  className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  value={formData.date}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
                <input
                  type="time"
                  required
                  className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  value={formData.time}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-xl border border-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-blue-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    value={formData.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-blue-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    value={formData.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                  <textarea
                    required
                    placeholder="123 Party St..."
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-blue-500 outline-none min-h-[80px]"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    value={formData.location}
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Droplet className="w-6 h-6 mr-2 text-cyan-400" />
                Flavor Preferences
              </h3>
              <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                <p className="text-sm text-gray-400 mb-2">e.g. Love 66, Blue Mist, Mint...</p>
                <input
                  type="text"
                  placeholder="Enter preferred flavors"
                  className="w-full bg-black/50 border border-gray-600 rounded-lg p-4 text-white focus:border-cyan-400 outline-none"
                  onChange={(e) => setFormData({ ...formData, flavors: e.target.value })}
                  value={formData.flavors}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-xl border border-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Confirm Request'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
