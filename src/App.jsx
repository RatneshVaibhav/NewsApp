import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import NoArticles from './components/NoArticles';
import Footer from './components/Footer';

const API_KEY = '005ce084c88d4d63a0cd3e38a448fde1'; 

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=100&apiKey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news. Please try again later.');
        }
        
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [category]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header currentCategory={category} onSelectCategory={setCategory} />
      
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 pl-2 border-l-4 border-indigo-500">
          Top Headlines: <span className="text-indigo-600 capitalize">{category}</span>
        </h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        ) : articles.length === 0 ? (
          <NoArticles />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;