// src/components/UrlStats.js
import React, { useState } from 'react';

function UrlStats() {
  const [shortUrl, setShortUrl] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleFetchStats = async (e) => {
    e.preventDefault();
    setError('');
    setStats(null);

    try {
      // Extract the slug from a full URL (e.g., http://localhost:8000/u/abc123)
      const slug = shortUrl.split('/').filter(Boolean).pop();
      const response = await fetch(`/api/urls/stats/${slug}`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err.message);
      setError('Could not retrieve stats. Please make sure the shortened URL is valid.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">URL Stats</h2>
      <form onSubmit={handleFetchStats} className="space-y-4">
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter shortened URL (e.g., http://localhost:8000/u/abc123)"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Get Stats
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <h3 className="text-lg font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {stats && (
        <div className="mt-6 p-4 bg-purple-100 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-700">Statistics:</h3>
          <p><strong>Long URL:</strong> {stats.long_url}</p>
          <p><strong>Created on:</strong> {stats.creation_date}</p>
          <p><strong>Visits:</strong> {stats.visits}</p>
        </div>
      )}
    </div>
  );
}

export default UrlStats;
