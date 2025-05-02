//
import React from 'react';
import UrlShortener from './components/UrlShortener';
import UrlDecoder from './components/UrlDecoder';
import UrlStats from './components/UrlStats';
import UrlList from './components/UrlList';
import Search from './components/UrlSearch'; // Import the Search component

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">🔗 URL Shortener</h1>

        {/* Search Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <Search /> {/* Add the Search component here */}
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <UrlShortener />
        </div>

        {/* URL Decoder */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <UrlDecoder />
        </div>

        {/* URL Stats */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <UrlStats />
        </div>

        {/* URL List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <UrlList />
        </div>
      </div>
    </div>
  );
}

export default App;
