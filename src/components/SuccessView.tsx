import { CheckCircle } from 'lucide-react';
import type { FormData } from '../types';

interface SuccessViewProps {
  formData: FormData;
  onReturnHome: () => void;
}

export default function SuccessView({ formData, onReturnHome }: SuccessViewProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Request Sent!</h2>
      <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-700 max-w-sm w-full mb-8 text-left space-y-2">
        <p className="text-gray-400 text-sm">
          CLIENT: <span className="text-white float-right">{formData.name}</span>
        </p>
        <p className="text-gray-400 text-sm">
          DATE: <span className="text-white float-right">{formData.date}</span>
        </p>
        <p className="text-gray-400 text-sm">
          TIME: <span className="text-white float-right">{formData.time}</span>
        </p>
        <div className="h-px bg-gray-700 my-2"></div>
        <p className="text-gray-400 text-sm">
          FLAVORS:{' '}
          <span className="text-cyan-400 float-right">{formData.flavors || "Chef's Choice"}</span>
        </p>
      </div>
      <p className="text-gray-300 mb-8 max-w-sm text-sm">
        We will text <b>{formData.phone}</b> shortly to confirm availability and send the deposit link.
      </p>
      <button
        onClick={onReturnHome}
        className="w-full max-w-xs py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-700 transition-all"
      >
        Return Home
      </button>
    </div>
  );
}
