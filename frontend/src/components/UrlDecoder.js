// src/components/UrlDecoder.js
import React, { useState } from 'react';
import { decodeURL } from '../api';

function UrlDecoder() {
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await decodeURL(shortUrl);
      setLongUrl(res.data.long_url);
    } catch (err) {
      alert('Error decoding URL');
    }
  };

  return (
    <div>
      <h2>Decode Short URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter short URL"
          required
        />
        <button type="submit">Decode</button>
      </form>
      {longUrl && <p>Original URL: {longUrl}</p>}
    </div>
  );
}

export default UrlDecoder;
