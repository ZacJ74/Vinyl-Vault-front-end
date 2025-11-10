import React, { useState, useEffect } from 'react';
// 1. Correctly import the named function from your fetch-based API service
import { getAlbums } from '../api/vinylVaultApi'; 
import { useAuth } from '../contexts/AuthContext'; 
// import AlbumCard from '../components/AlbumCard'; // Future component

function AlbumIndex() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    // Only attempt to fetch if the user is authenticated
    if (isAuthenticated) {
      const fetchAlbums = async () => {
        try {
          // 2. Correctly call the imported getAlbums function. 
          // This function handles the network request and returns the JSON data.
          const albumData = await getAlbums(); 
          
          setAlbums(albumData); 
          setIsLoading(false);
          setError(null);
        } catch (err) {
          // Error handling catches issues like network failure or 403/404 from the server
          console.error("Failed to fetch albums:", err.message);
          setError("Failed to load albums. Please ensure the server is running.");
          setIsLoading(false);
        }
      };

      fetchAlbums();
    } else {
      setIsLoading(false);
      // While PrivateRoute handles the redirect, this ensures clear state if somehow reached
      setError("You must be signed in to view albums."); 
    }
  }, [isAuthenticated]); // Re-runs if the user signs in/out

  // --- Conditional Rendering for UX ---

  if (isLoading) {
    return (
      <div className="album-index">
        <h2>Vinyl Collection</h2>
        <p>Loading your vinyl records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="album-index error">
        <h2>Error</h2>
        <p>{error}</p>
        <p>If you just signed in, check your server console for specific errors.</p>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="album-index">
        <h2>Vinyl Collection</h2>
        <p>You don't have any albums yet! Use the "Add New Album" button to get started.</p>
      </div>
    );
  }

  // --- Success Rendering ---
  return (
    <div className="album-index">
      <h1>My Vinyl Vault 🎶</h1>
      <p>Total Albums: **{albums.length}**</p>
      
      <div className="album-list">
        {/* Map over the albums and display key details */}
        {albums.map((album) => (
          <div key={album._id} className="album-item">
            **{album.title}** by {album.artist} ({album.year})
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumIndex;