import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]); // Clear results when query is erased or too short
      return;
    }

    const debounceTimeout = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/urls/search?query=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setResults(Object.entries(data.urls));
      } else {
        toast.error('No results found.');
        setResults([]);
      }
    } catch (error) {
      toast.error('Error fetching search results. Please try again.');
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container p-4">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Search URLs</h2>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by URL..."
          className="p-2 w-full border rounded-lg"
        />
        <button
          onClick={() => handleSearch(query)}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="results">
          <ul className="space-y-4">
            {results.map(([shortCode, { long_url, visits }]) => (
              <li
                key={shortCode}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-indigo-700">Short URL:</p>
                  <a
                    href={`/u/${shortCode}`}
                    className="text-blue-600 hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${window.location.origin}/u/${shortCode}`}
                  </a>
                  <p className="text-sm text-gray-600">Long URL: {long_url}</p>
                  <p className="text-sm text-gray-600">Visits: {visits}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && query.length >= 3 && !loading && (
        <p className="text-gray-600">No results found for "{query}".</p>
      )}
    </div>
  );
}

export default Search;
