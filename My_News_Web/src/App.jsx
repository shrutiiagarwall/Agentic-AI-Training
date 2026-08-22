import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import { fetchNews } from './utils/api';

const ALL_CATEGORY = 'All';

function App() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([ALL_CATEGORY]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode initially
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Fetch news data
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNews();
        setNews(data);
        
        // Extract unique categories
        const uniqueCategories = [ALL_CATEGORY, ...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Effect to apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  news={news} 
                  isLoading={isLoading} 
                  error={error} 
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                />
              } 
            />
            <Route 
              path="/article/:id" 
              element={<ArticleDetail news={news} />} 
            />
          </Routes>
        </div>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 py-8 mt-12 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-black font-serif tracking-tight text-gray-900 dark:text-white mb-2">
              The <span className="text-brand-accent">Nexus</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} The Nexus News. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
