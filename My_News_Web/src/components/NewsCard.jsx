import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const NewsCard = ({ article }) => {
  const { id, title, date, imageUrl, category, excerpt } = article;
  
  const formattedDate = date ? format(parseISO(date), 'MMM dd, yyyy') : '';
  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop';

  return (
    <Link to={`/article/${id}`} className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer border border-gray-100 dark:border-gray-800 h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={imageUrl || fallbackImage} 
          alt={title}
          onError={(e) => { e.target.src = fallbackImage }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {category && (
          <div className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
          <Calendar size={14} className="mr-1.5" />
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900 dark:text-white leading-tight mb-3 line-clamp-3 group-hover:text-brand-accent transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-auto">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
