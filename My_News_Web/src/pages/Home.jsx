import React, { useState, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';

const Home = ({ news, isLoading, error, selectedCategory, searchQuery }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-8 animate-pulse p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="w-full h-[60vh] bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-600 dark:text-gray-400">Failed to load the latest news. Please try again later.</p>
      </div>
    );
  }

  // Filter news based on category and search query
  const filteredNews = useMemo(() => {
    return news.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const heroArticle = filteredNews.length > 0 ? filteredNews[0] : null;
  const gridArticles = filteredNews.length > 0 ? filteredNews.slice(1) : [];

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Search/Filter Results Info */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <div className="mb-8 text-gray-600 dark:text-gray-400">
          Showing results for: 
          {selectedCategory !== 'All' && <span className="font-semibold text-gray-900 dark:text-white ml-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{selectedCategory}</span>}
          {searchQuery && <span className="font-semibold text-gray-900 dark:text-white ml-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">"{searchQuery}"</span>}
        </div>
      )}

      {/* Hero Section */}
      {!searchQuery && selectedCategory === 'All' && heroArticle && (
        <HeroSection article={heroArticle} />
      )}

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {gridArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or category filter.</p>
        </div>
      )}
    </main>
  );
};

export default Home;
