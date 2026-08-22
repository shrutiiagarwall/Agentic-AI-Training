# The Nexus - Modern News Frontend

A modern, highly aesthetic, and responsive frontend for a News Website. This project dynamically fetches and renders live news data from a Google Sheet, presenting it in a polished, editorial layout.

## Features

- **Dynamic Data Fetching:** Seamlessly pulls live data from a Google Sheet CSV export using PapaParse.
- **Modern UI & Aesthetics:** Built with Tailwind CSS, featuring a beautiful grid layout, refined typography (Merriweather & Inter), subtle micro-interactions, and premium hover effects.
- **Hero Section:** Highlights the latest or most important news story prominently at the top.
- **Article Detail View:** dedicated landing pages (`/article/:id`) for individual news items, routing users to original sources.
- **Dark Mode Support:** Sleek, accessible dark mode that adapts to user preference.
- **Search & Filtering:** Real-time search by keywords and categorization to quickly find news.
- **Fully Responsive:** Adapts flawlessly across mobile, tablet, and desktop screens.

## Tech Stack

- **React 18** (Bootstrapped with Vite)
- **Tailwind CSS v4** (Utility-first styling framework)
- **React Router v6** (Client-side routing)
- **PapaParse** (CSV parser for reading Google Sheets data)
- **Lucide React** (Beautiful, consistent icons)
- **date-fns** (Modern JavaScript date utility library)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/my-news-web.git
   cd my-news-web
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Customizing the Data Source

Currently, the application fetches news from a specific Google Sheet CSV URL. To use your own data:

1. Create a Google Sheet with headers like: `News Title`, `date`, `image url`, and `article url`.
2. Go to **File > Share > Publish to web** and publish the entire document as a **Comma-separated values (.csv)**.
3. Copy the provided CSV link.
4. Open `src/utils/api.js` and replace the `GOOGLE_SHEET_CSV_URL` constant with your new link.

## Building for Production

To create an optimized production build, run:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## License

Distributed under the MIT License. See `LICENSE` for more information.
