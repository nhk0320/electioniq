import React, { useState } from 'react';
import { Phone, PhoneCall, ExternalLink, X, Info } from 'lucide-react';

const Helpline = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-800' : 'bg-gradient-to-r from-red-600 to-orange-600'} text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce-slow`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <PhoneCall className="w-6 h-6" />}
      </button>

      {/* Popup Menu */}
      <div className={`absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-t-2xl text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Info className="w-5 h-5" /> Official Help & Support
          </h3>
          <p className="text-sm opacity-90">Election Commission of India</p>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-xs font-bold text-red-800 uppercase mb-1">National Voter Helpline</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-red-600 tracking-wider">1950</span>
              <a href="tel:1950" className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-md">
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-red-600 mt-2 font-medium">Toll-free, accessible from across India.</p>
          </div>

          <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
            <div>
              <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Voter Services Portal</p>
              <p className="text-xs text-gray-500">Register, Update, Download EPIC</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
          </a>

          <a href="https://cgil.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
            <div>
              <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">National Grievance Service</p>
              <p className="text-xs text-gray-500">Register a complaint</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Helpline;
