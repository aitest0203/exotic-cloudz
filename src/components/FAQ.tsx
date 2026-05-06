import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/business';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">FAQ</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
      </div>
      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-white font-semibold pr-4">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
