import React, { useState } from 'react';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    setShortUrl('');

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/urls/encode/', {
        method: 'POST',
        body: JSON.stringify({ long_url: longUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.short_url) {
        setShortUrl(data.short_url);
        navigator.clipboard.writeText(data.short_url).then(() => {
          setCopied(true);
        });
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Shorten Your URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Shorten URL
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <h3 className="text-lg font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Shortened URL:</h3>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {shortUrl}
          </a>
          {copied && (
            <p className="text-sm text-green-700 mt-2">✅ Copied to clipboard!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
