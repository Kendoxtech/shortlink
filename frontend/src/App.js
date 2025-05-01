// src/App.js
import React from 'react';
import UrlShortener from './components/UrlShortener';
import UrlDecoder from './components/UrlDecoder';
import UrlStats from './components/UrlStats';

function App() {
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <UrlShortener />
      <hr />
      <UrlDecoder />
      <hr />
      <UrlStats />
    </div>
  );
}

export default App;
