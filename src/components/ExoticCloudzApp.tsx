import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Instagram,
  Facebook,
  Menu,
  X,
  Wind,
  ExternalLink,
  Phone,
} from 'lucide-react';
import Hero from './Hero';
import BookingFlow from './BookingFlow';
import SuccessView from './SuccessView';
import FAQ from './FAQ';
import ContactStrip from './ContactStrip';
import { PACKAGES, WORKSPACE_DASHBOARD, LOGO_SRC } from '../data/packages';
import { BUSINESS } from '../data/business';
import { submitBooking } from '../lib/submitBooking';
import type { FormData, View } from '../types';

const EMPTY_FORM: FormData = {
  package: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  location: '',
  flavors: '',
};

export default function ExoticCloudzApp() {
  const [view, setView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  // ─────────────────────────────────────────────────────────────────────────
  // REAL BACKEND INTEGRATION — replaces the prior setTimeout simulation.
  // POSTs the booking payload to the configured Google Apps Script Web App
  // (or Formspree fallback). See src/lib/submitBooking.ts for transport
  // details (Apps Script CORS quirks: text/plain content type, no preflight).
  // ─────────────────────────────────────────────────────────────────────────
  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitBooking(formData);

      if (!result.ok) {
        const message =
          result.error ||
          (typeof result.body === 'string'
            ? result.body
            : `Server responded with status ${result.status}`);
        setSubmitError(message);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setView('success');
      window.scrollTo(0, 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown network error';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    setView('home');
    setBookingStep(1);
    setFormData(EMPTY_FORM);
    setSubmitError(null);
  };

  const NavItem = ({ label, targetView }: { label: string; targetView: View }) => (
    <button
      onClick={() => {
        setView(targetView);
        setIsMenuOpen(false);
      }}
      className="block w-full text-left px-4 py-3 text-lg font-medium hover:bg-white/10 transition-colors text-white"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative bg-black">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div
              className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2"
              onClick={() => setView('home')}
            >
              <img
                src={LOGO_SRC}
                className="h-8 w-auto object-contain"
                alt="Logo"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const fallback = document.getElementById('text-logo-nav');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="text-logo-nav" className="hidden items-center gap-1">
                <Wind className="w-6 h-6 text-blue-500" />
                <span>
                  EXOTIC<span className="text-blue-500">CLOUDZ</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-4 animate-fade-in">
          <div className="space-y-4">
            <NavItem label="Home" targetView="home" />
            <NavItem label="Book Reservation" targetView="booking" />
            <button
              onClick={() => {
                setView('home');
                setIsMenuOpen(false);
                setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 60);
              }}
              className="block w-full text-left px-4 py-3 text-lg font-medium hover:bg-white/10 transition-colors text-white"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setView('home');
                setIsMenuOpen(false);
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 60);
              }}
              className="block w-full text-left px-4 py-3 text-lg font-medium hover:bg-white/10 transition-colors text-white"
            >
              Contact
            </button>
            <div className="h-px bg-white/10 my-4" />
            <a
              href={`tel:${BUSINESS.phoneDigits}`}
              className="flex items-center w-full px-4 py-3 text-lg font-medium text-green-400 hover:bg-white/5 rounded-lg"
            >
              <Phone className="w-5 h-5 mr-3" /> {BUSINESS.phoneDisplay}
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center w-full px-4 py-3 text-lg font-medium text-pink-500 hover:bg-white/5 rounded-lg"
            >
              <Instagram className="w-5 h-5 mr-3" /> @{BUSINESS.instagramHandle}
            </a>
            <div className="mt-8 pt-8 border-t border-white/10">
              <a
                href={WORKSPACE_DASHBOARD}
                target="_blank"
                rel="noreferrer"
                className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-500 hover:text-white uppercase tracking-widest"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> Staff Portal
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10">
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <div className="py-8 bg-blue-900/10 border-y border-blue-500/20 backdrop-blur-sm">
              <div className="flex justify-center gap-12 text-blue-300/50">
                <a href={BUSINESS.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="w-8 h-8 hover:text-pink-400 hover:scale-110 transition-all cursor-pointer" />
                </a>
                <a href={BUSINESS.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook className="w-8 h-8 hover:text-blue-500 hover:scale-110 transition-all cursor-pointer" />
                </a>
                <a href={`tel:${BUSINESS.phoneDigits}`} aria-label="Call us">
                  <Phone className="w-8 h-8 hover:text-green-400 hover:scale-110 transition-all cursor-pointer" />
                </a>
              </div>
              <p className="text-center text-xs text-blue-200/50 mt-4 tracking-widest uppercase">
                Follow @{BUSINESS.instagramHandle}
              </p>
            </div>
            <div id="packages" className="py-20 px-4 max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                  Our Packages
                </h2>
                <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all hover:bg-gray-900/90 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] backdrop-blur-sm"
                  >
                    <div className="mb-4">{pkg.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-blue-400 mb-4 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                      {pkg.price}
                    </div>
                    <p className="text-sm text-gray-400 mb-6">{pkg.description}</p>
                    <button
                      onClick={() => {
                        setView('booking');
                        setFormData({ ...formData, package: pkg.id });
                        setBookingStep(2);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full py-3 bg-white/5 hover:bg-blue-600 hover:text-white hover:border-transparent border border-gray-600 text-gray-300 rounded-lg font-bold transition-all"
                    >
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <FAQ />
            <ContactStrip />
          </>
        )}

        {view === 'booking' && (
          <>
            <BookingFlow
              step={bookingStep}
              setStep={setBookingStep}
              formData={formData}
              setFormData={setFormData}
              isSubmitting={isSubmitting}
              onSubmit={handleFinalSubmit}
            />
            {submitError && (
              <div className="max-w-2xl mx-auto px-4 pb-12 -mt-4">
                <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-sm text-red-200">
                  <strong className="block mb-1">Submission failed</strong>
                  <span className="opacity-90">{submitError}</span>
                </div>
              </div>
            )}
          </>
        )}

        {view === 'success' && <SuccessView formData={formData} onReturnHome={handleReturnHome} />}
      </main>

      <footer className="py-12 px-4 border-t border-white/5 bg-black/80 backdrop-blur-md text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center gap-6">
            <a
              href={`tel:${BUSINESS.phoneDigits}`}
              className="text-gray-400 hover:text-green-400 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 inline mr-1" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
            >
              <Instagram className="w-4 h-4 inline mr-1" />@{BUSINESS.instagramHandle}
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 {BUSINESS.name} Mobile Hookah · {BUSINESS.city}, {BUSINESS.state}
          </p>
          <p className="text-gray-700 text-xs">
            Must be 21+ to use hookah products. Service available {BUSINESS.serviceArea}.
          </p>
        </div>
      </footer>
    </div>
  );
}
