import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const ArticleDetail = ({ news }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = news.find(n => n.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!news || news.length === 0) {
    return <div className="h-screen flex items-center justify-center dark:text-white">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
        <button onClick={() => navigate('/')} className="text-brand-accent hover:underline inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </button>
      </div>
    );
  }

  const formattedDate = article.date ? format(parseISO(article.date), 'MMMM dd, yyyy - h:mm a') : '';
  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-dark-bg animate-in fade-in duration-500">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
        
        {/* Top Navigation */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-accent dark:text-gray-400 dark:hover:text-brand-accent transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8 lg:mb-12">
          {article.category && (
            <div className="flex items-center text-brand-accent font-bold text-sm uppercase tracking-wider mb-4">
              <Tag size={16} className="mr-2" />
              {article.category}
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-gray-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm gap-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <span>By The Nexus Team</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 border border-gray-100 dark:border-gray-800">
          <img 
            src={article.imageUrl || fallbackImage} 
            alt={article.title}
            onError={(e) => { e.target.src = fallbackImage }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body (Simulated for this scenario) */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-12">
          <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-400 mb-8 border-l-4 border-brand-accent pl-6">
            {article.excerpt}
          </p>
          
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want to read the full story?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              This article is hosted externally. Click below to read the complete coverage on the original source.
            </p>
            {article.articleUrl ? (
              <a 
                href={article.articleUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-brand-accent hover:bg-rose-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Read Full Article <ExternalLink size={20} className="ml-2" />
              </a>
            ) : (
              <p className="text-red-500 font-medium">Link not available for this article.</p>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};

export default ArticleDetail;
