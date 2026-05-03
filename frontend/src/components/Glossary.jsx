import React, { useState } from 'react';
import axios from 'axios';
import { Search, BookOpen, Loader2, BookA, Bookmark } from 'lucide-react';

const commonTerms = [
  "EVM",
  "VVPAT",
  "Lok Sabha",
  "Model Code of Conduct",
  "Constituency",
  "NOTA",
  "Election Commission"
];

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e, termToSearch = null) => {
    if (e) e.preventDefault();
    
    const query = termToSearch || searchTerm;
    if (!query.trim()) return;

    if (!termToSearch) setSearchTerm(query);
    
    setIsLoading(true);
    setError(null);
    setDefinition(null);

    try {
      const response = await axios.post('/api/glossary', {
        term: query
      });
      setDefinition(response.data);
    } catch (err) {
      console.error("Error fetching definition:", err);
      setError("Could not find a definition. Please make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-green-600 p-8 text-white text-center">
        <BookOpen size={48} className="mx-auto mb-4 opacity-90" />
        <h2 className="text-3xl font-bold mb-2">Election Dictionary</h2>
        <p className="text-green-100 max-w-lg mx-auto">Confused by political jargon? Search for any election term to get a simple, easy-to-understand definition.</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSearch} className="relative mb-8 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-32 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-lg transition-all"
            placeholder="Search for terms like 'EVM', 'NOTA', 'Lok Sabha'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="absolute inset-y-2 right-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 rounded-lg disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Define"}
          </button>
        </form>

        <div className="max-w-2xl mx-auto">
          {definition && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4 border-b border-orange-200 pb-4">
                <Bookmark className="text-orange-600" size={24} />
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{definition.term}</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {definition.definition}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl text-center mb-8 border border-green-100">
              {error}
            </div>
          )}

          <div className="mt-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookA size={16} /> Commonly Searched Terms
            </h4>
            <div className="flex flex-wrap gap-2">
              {commonTerms.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(null, term)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-gray-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glossary;
