import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UrlList() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch('/api/urls/');
        const data = await response.json();

        // Make sure the response contains the 'urls' object
        if (data.urls) {
          setUrls(Object.entries(data.urls));
        } else {
          throw new Error('No URLs data found.');
        }
      } catch (err) {
        toast.error('Failed to load URLs. Please try again.');
        setError('Failed to load URLs.');
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (shortCode) => {
    try {
      const response = await fetch(`/api/urls/${shortCode}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted URL from the list
        setUrls((prevUrls) => prevUrls.filter(([code]) => code !== shortCode));
        toast.success('URL deleted successfully.');
      } else {
        // Log and show the error message from the server
        const text = await response.text();
        console.error('Error deleting URL:', text);
        throw new Error(`Server error: ${text}`);
      }
    } catch (err) {
      // Handle and display error
      console.error('Delete operation failed:', err);
      toast.error('Failed to delete URL. Please try again.');
    }
  };

  const baseShortUrl = `${window.location.origin}/u/`;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Shortened URL List</h2>

      {urls.length === 0 ? (
        <p className="text-gray-600">No URLs shortened yet.</p>
      ) : (
        <ul className="space-y-4">
          {urls.map(([shortCode, { long_url, visits }]) => (
            <li
              key={shortCode}
              className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-indigo-700">Short URL:</p>
                <a
                  href={`${baseShortUrl}${shortCode}`}
                  className="text-blue-600 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${baseShortUrl}${shortCode}`}
                </a>
                <p className="text-sm text-gray-600">Long URL: {long_url}</p>
                <p className="text-sm text-gray-600">Visits: {visits}</p>
              </div>
              <button
                onClick={() => handleDelete(shortCode)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UrlList;
