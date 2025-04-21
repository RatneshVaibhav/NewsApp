import React, { useState, useEffect } from 'react';
import { HeartIcon, XCircleIcon } from 'lucide-react';

function NasaImageExplorer() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [favorites, setFavorites] = useState([]);

  // Replace with your NASA API key
  const API_KEY = "DEMO_KEY"; // Using DEMO_KEY for demonstration purposes

  useEffect(() => {
    fetchAPOD(date);
  }, [date]);

  const fetchAPOD = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
      );
      
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setApodData(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
      setApodData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addToFavorites = () => {
    if (apodData && !favorites.some(fav => fav.date === apodData.date)) {
      const newFavorite = {
        date: apodData.date,
        title: apodData.title,
        url: apodData.url
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFromFavorites = (dateToRemove) => {
    setFavorites(favorites.filter(fav => fav.date !== dateToRemove));
  };

  // Get today's date in YYYY-MM-DD format for max date value
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">NASA Astronomy Explorer</h1>
          <p className="text-lg text-blue-200">Discover the wonders of our universe</p>
        </header>
        
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <label htmlFor="date-picker" className="block text-blue-300 mb-2">Select a date:</label>
            <input
              id="date-picker"
              type="date"
              value={date}
              onChange={handleDateChange}
              max={today}
              min="1995-06-16" // First available APOD date
              className="p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-pulse text-blue-300 text-center">
              <p className="text-xl mb-2">Loading cosmic wonders...</p>
              <p className="text-sm">Reaching across time and space</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 text-red-200 p-4 rounded-lg text-center mx-auto max-w-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {apodData && !loading && (
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl mb-12">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-400 mb-1">{apodData.title}</h2>
              <p className="text-sm text-blue-200 mb-4">{apodData.date}</p>
            </div>
            
            <div className="flex justify-center bg-black">
              {apodData.media_type === 'image' ? (
                <img 
                  src={apodData.url} 
                  alt={apodData.title}
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <div className="w-full aspect-video">
                  <iframe
                    src={apodData.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={apodData.title}
                  ></iframe>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <button 
                onClick={addToFavorites}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-6 transition-colors"
              >
                <HeartIcon size={16} />
                <span>Add to Favorites</span>
              </button>
              
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-blue-300 mb-2">Explanation:</h3>
                <p className="text-slate-200 leading-relaxed">{apodData.explanation}</p>
                
                {apodData.copyright && (
                  <p className="text-right text-sm text-slate-400 mt-4">
                    © {apodData.copyright}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 pb-2 border-b border-blue-800">Your Cosmic Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((fav) => (
                <div 
                  key={fav.date} 
                  className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                >
                  <div className="h-40 bg-black flex items-center justify-center overflow-hidden">
                    <img 
                      src={fav.url} 
                      alt={fav.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-blue-300 text-sm mb-1 truncate" title={fav.title}>
                      {fav.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">{fav.date}</p>
                    <button 
                      onClick={() => removeFromFavorites(fav.date)}
                      className="flex items-center gap-1 text-xs bg-red-900/70 hover:bg-red-800 text-red-200 px-2 py-1 rounded transition-colors"
                    >
                      <XCircleIcon size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>Data provided by NASA's Astronomy Picture of the Day API</p>
          <p className="mt-1">Created with React and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default NasaImageExplorer;