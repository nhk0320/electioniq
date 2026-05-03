import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Map, CheckCircle2, User, Home } from 'lucide-react';

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
        blo: 'Mr. Ramesh Kumar (+91-9876543210)'
      });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in-up">
      <div className="glass-card rounded-2xl p-8 shadow-xl bg-gradient-to-br from-white to-orange-50/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Map className="text-orange-500 w-8 h-8" />
            {t('boothTitle')}
          </h2>
          <p className="text-gray-600 mt-2">{t('boothSubtitle')}</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('boothInputEpic')}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
              placeholder="e.g. ABC1234567"
              value={epicNumber}
              onChange={(e) => setEpicNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center text-gray-400 font-medium">OR</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('boothInputPin')}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
              placeholder="e.g. 110001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSearching || (!epicNumber && !pincode)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg shadow-orange-200 hover:shadow-orange-300"
          >
            {isSearching ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Search className="animate-spin w-5 h-5" /> {t('boothSearching')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" /> {t('boothSearchBtn')}
              </span>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-10 animate-fade-in-up bg-white p-6 rounded-xl border border-gray-100 shadow-md">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4 border-b pb-3">
              <CheckCircle2 className="w-6 h-6" /> {t('boothResultTitle')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                <Home className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{result.name}</p>
                  <p className="text-sm text-orange-600 font-medium">{t('boothResultRoom')}: {result.room}</p>
                  <p className="text-sm text-gray-600 mt-1">{result.address}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                <User className="text-gray-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{t('boothResultOfficer')}</p>
                  <p className="text-sm text-gray-600 mt-1">{result.blo}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative text-center z-10 p-4">
                <Map className="w-8 h-8 text-orange-500 mx-auto mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-gray-500">{t('boothSimulatedNote')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothLocator;
