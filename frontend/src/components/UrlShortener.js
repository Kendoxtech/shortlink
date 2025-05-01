// src/components/UrlShortener.js
import React, { useState } from 'react';
import { shortenURL } from '../api';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await shortenURL(longUrl);
      setShortUrl(res.data.short_url);
    } catch (err) {
      alert('Error shortening URL');
    }
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && <p>Shortened URL: <a href={shortUrl}>{shortUrl}</a></p>}
    </div>
  );
}

export default UrlShortener;
