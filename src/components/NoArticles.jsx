import React from 'react';

const NoArticles = () => {
  return (
    <div className="text-center py-16 bg-gray-100 rounded-xl">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="mt-4 text-xl text-gray-600">No articles found in this category.</p>
      <p className="text-gray-500 mt-2">Try selecting a different category above.</p>
    </div>
  );
};

export default NoArticles;