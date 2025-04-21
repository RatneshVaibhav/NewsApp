import React from 'react';
import CategorySelector from './CategorySelector';

const Header = ({ currentCategory, onSelectCategory }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight">Daily Pulse</h1>
        <p className="text-center text-indigo-100 mb-6 max-w-2xl mx-auto">
          Stay informed with the latest headlines and breaking news from around the world
        </p>
        
        <CategorySelector 
          currentCategory={currentCategory} 
          onSelectCategory={onSelectCategory} 
        />
      </div>
    </header>
  );
};

export default Header;