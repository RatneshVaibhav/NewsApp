import React from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-52 overflow-hidden bg-gray-200">
        {article.urlToImage ? (
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {article.source?.name || 'News'}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:text-indigo-600">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{article.description || 'No description available'}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{article.publishedAt ? formatDate(article.publishedAt) : 'Unknown Date'}</span>
          </div>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          Read Full Story
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;