import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const HeroSection = ({ article }) => {
  if (!article) return null;

  const { id, title, date, imageUrl, category, excerpt } = article;
  const formattedDate = date ? format(parseISO(date), 'MMMM dd, yyyy') : '';
  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl mb-12 group">
      {/* Background Image */}
      <img 
        src={imageUrl || fallbackImage} 
        alt={title}
        onError={(e) => { e.target.src = fallbackImage }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 xl:p-16 flex flex-col justify-end">
        <div className="max-w-4xl">
          {category && (
            <span className="inline-block bg-brand-accent text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 md:mb-6 uppercase tracking-widest shadow-lg">
              {category}
            </span>
          )}
          
          <Link to={`/article/${id}`}>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-6 hover:text-gray-200 transition-colors duration-300 drop-shadow-md">
              {title}
            </h1>
          </Link>
          
          <p className="text-gray-200 text-base md:text-lg lg:text-xl line-clamp-2 max-w-3xl mb-4 font-light drop-shadow">
            {excerpt}
          </p>
          
          <div className="flex items-center text-gray-300 text-sm md:text-base font-medium">
            <span>By The Nexus Team</span>
            <span className="mx-3 text-brand-accent">•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
