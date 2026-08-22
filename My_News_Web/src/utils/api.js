import Papa from 'papaparse';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1vPD5KTveAlUcm0zw6NMveYFxOICoNkkXLWmDOviwq_c/export?format=csv';

// Mock categories for demonstration since they don't exist in the sheet
const MOCK_CATEGORIES = ['Politics', 'World', 'India', 'Entertainment', 'Sports', 'Lifestyle'];

const assignRandomCategory = (seed) => {
  const index = Math.abs(seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % MOCK_CATEGORIES.length;
  return MOCK_CATEGORIES[index];
};

export const fetchNews = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const data = results.data
            .filter(row => row['News Title'] && row['News Title'].trim() !== '')
            .map((row, index) => {
              // Extract the ID from the article URL or use index
              const articleUrl = row['article url'] || '';
              const id = articleUrl ? btoa(articleUrl).replace(/=/g, '').substring(0, 15) : `article-${index}`;
              
              return {
                id,
                title: row['News Title'],
                date: row['date'],
                imageUrl: row['image url'],
                articleUrl: articleUrl,
                category: assignRandomCategory(row['News Title'] || String(index)),
                excerpt: row['News Title'] // Using title as excerpt since there's no description
              };
            });
          
          resolve(data);
        } catch (error) {
          console.error("Error formatting data:", error);
          reject(error);
        }
      },
      error: (error) => {
        console.error("Error fetching CSV:", error);
        reject(error);
      }
    });
  });
};
