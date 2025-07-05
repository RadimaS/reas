import React from 'react';
import { X, Phone, PhoneCall } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const { siteData } = useSiteData();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneCall className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {siteData.modal.title}
          </h2>
          <p className="text-gray-300 text-sm">
            {siteData.modal.subtitle}
          </p>
        </div>

        {/* Phone Number - Main CTA */}
        <div className="mb-6">
          <a
            href="tel:+79389085906"
            className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 flex items-center justify-center space-x-3"
          >
            <Phone className="w-5 h-5 group-hover:animate-pulse" />
            <span>Позвонить</span>
          </a>
        </div>

        {/* Benefits */}
        <div className="bg-slate-700/50 p-4 rounded-xl">
          <h3 className="font-semibold text-orange-400 mb-3 text-center">Что вы получите:</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            {siteData.modal.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            {siteData.modal.footer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallModal;