import React, { useState } from 'react';

function UrlDecoder() {
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  const handleDecode = async (e) => {
    e.preventDefault();

    if (!shortUrl.startsWith("http://") && !shortUrl.startsWith("https://")) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/urls/decode/', {
        method: 'POST',
        body: JSON.stringify({ short_url: shortUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.long_url) {
        setLongUrl(data.long_url);
        setError('');
      } else {
        setLongUrl('');
        setError('Short URL not found');
      }
    } catch (error) {
      console.error('Error decoding URL:', error);
      setLongUrl('');
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Decode a Shortened URL</h2>
      <form onSubmit={handleDecode} className="space-y-4">
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter shortened URL"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Decode URL
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <h3 className="text-lg font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {longUrl && (
        <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-700">Long URL:</h3>
          <a
            href={longUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {longUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default UrlDecoder;
