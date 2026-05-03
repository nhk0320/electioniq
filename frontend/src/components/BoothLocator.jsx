import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Map, CheckCircle2, User, Home, Navigation } from 'lucide-react';

const BoothLocator = () => {
  const { t } = useLanguage();
  const [epicNumber, setEpicNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!epicNumber && !pincode) return;

    setIsSearching(true);
    setResult(null);

    // Simulate an API call
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        name: 'Govt. Higher Secondary School',
        room: 'Room No. 4',
        address: 'Main Road, Sample District, State - 123456',
        blo: 'Mr. Ramesh Kumar (+91-9876543210)',
        // Simulated coordinates for a place in India (e.g., somewhere in Delhi)
        lat: '28.6139',
        lon: '77.2090'
      });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in-up">
      <div className="glass-card rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-white to-orange-50/50 hover:shadow-orange-500/20 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <Map className="text-orange-600 w-8 h-8" />
            </div>
            {t('boothTitle')}
          </h2>
          <p className="text-gray-600 mt-3 text-lg">{t('boothSubtitle')}</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto relative z-10">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors">{t('boothInputEpic')}</label>
            <input 
              type="text" 
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all duration-300"
              placeholder="e.g. ABC1234567"
              value={epicNumber}
              onChange={(e) => setEpicNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center text-gray-400 font-medium py-2">OR</div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors">{t('boothInputPin')}</label>
            <input 
              type="text" 
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all duration-300"
              placeholder="e.g. 110001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSearching || (!epicNumber && !pincode)}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-1"
          >
            {isSearching ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Search className="animate-spin w-6 h-6" /> {t('boothSearching')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-6 h-6" /> {t('boothSearchBtn')}
              </span>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-12 animate-fade-in-up bg-white p-6 rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative">
            <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-6 border-b pb-4">
              <CheckCircle2 className="w-8 h-8" /> {t('boothResultTitle')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Home className="text-orange-600 w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg leading-tight">{result.name}</p>
                  <p className="text-sm text-orange-600 font-bold mt-1 bg-orange-100 inline-block px-2 py-0.5 rounded">{t('boothResultRoom')}: {result.room}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{result.address}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <User className="text-blue-600 w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{t('boothResultOfficer')}</p>
                  <p className="text-md text-gray-700 mt-1 font-medium">{result.blo}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 relative rounded-xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 flex items-center gap-1 shadow-sm border border-gray-200">
                <Navigation className="w-3 h-3 text-orange-500" /> Interactive Map View
              </div>
              <iframe 
                width="100%" 
                height="300" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(result.lon)-0.01}%2C${parseFloat(result.lat)-0.01}%2C${parseFloat(result.lon)+0.01}%2C${parseFloat(result.lat)+0.01}&layer=mapnik&marker=${result.lat}%2C${result.lon}`}
                className="w-full h-[300px]"
                title="Polling Booth Map"
              ></iframe>
            </div>
            
            <p className="text-xs text-center text-gray-400 mt-4 italic">{t('boothSimulatedNote')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothLocator;
