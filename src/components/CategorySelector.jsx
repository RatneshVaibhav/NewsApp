import React from 'react';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const CategorySelector = ({ currentCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            currentCategory === cat
              ? 'bg-white text-indigo-700 shadow-md'
              : 'bg-indigo-500 bg-opacity-40 text-white hover:bg-indigo-400 hover:bg-opacity-60'
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;