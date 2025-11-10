

// src/api/vinylVaultApi.js

// Use a more generic backend URL for auth, as /albums is only for albums.
const BASE_URL = process.env.REACT_APP_BACK_END_SERVER_URL; 
// Note: We use the full URL in the auth functions below.


// --- API Service Functions ---

/**
 * Handles user sign-in by sending credentials to the server.
 * @param {object} credentials - User email and password.
 * @returns {Promise<object>} - Response containing user profile and token.
 */
const signIn = async (credentials) => {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/signin`,
      buildOptions(credentials, 'POST')
    );
    
    // Check if the response was successful
    if (res.ok) {
        return res.json();
    }

    // Parse the error body and throw a detailed error
    const errorData = await res.json();
    throw new Error(errorData.msg || 'Sign in failed');

  } catch (error) {
    console.error("Error in signIn:", error);
    throw error;
  }
};

/**
 * Handles user sign-up by sending profile data to the server.
 * @param {object} profile - User data (name, email, password, etc.).
 * @returns {Promise<object>} - Response containing user profile and token.
 */
const signUp = async (profile) => {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/signup`,
      buildOptions(profile, 'POST')
    );
    
    if (res.ok) {
        return res.json();
    }
    
    const errorData = await res.json();
    throw new Error(errorData.msg || 'Sign up failed');

  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
};


// Function to get all albums (Corresponds to your instructor's 'index' function)
// Note: This function now uses the generic BASE_URL.
const getAlbums = async () => {
  try {
    const res = await fetch(`${BASE_URL}/albums`, buildOptions()); // GET request
    // IMPORTANT: fetch responses need to check for errors manually
    if (res.ok) {
        return res.json();
    }
    // Throw an error if the response status is not successful (e.g., 403 Forbidden)
    throw new Error('Failed to fetch albums: ' + res.statusText);
  } catch (err) {
    console.error("Error in getAlbums:", err);
    throw err; // Re-throw the error so AlbumIndex can catch it
  }
};

// You will add other functions (createAlbum, deleteAlbum, etc.) here later...

// --- Helper Function ---

// Replicating your instructor's buildOptions to handle the JWT token securely
function buildOptions(data, method = 'GET') {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, 
      'Content-Type': 'application/json',
    },
  };
  // If we need to send json data with the request (POST, PUT, PATCH)
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}


export { getAlbums, signIn, signUp };






// // src/api/vinylVaultApi.js

// // 1. Update the BASE_URL to point to your Album backend route
// // (Assuming your server URL is configured in your environment variables)
// const BASE_URL = process.env.REACT_APP_BACK_END_SERVER_URL;


// // --- API Service Functions ---








// // Function to get all albums (Corresponds to your instructor's 'index' function)
// const getAlbums = async () => {
//   try {
//     const res = await fetch(BASE_URL, buildOptions()); // GET request
//     // IMPORTANT: fetch responses need to check for errors manually
//     if (res.ok) {
//         return res.json();
//     }
//     // Throw an error if the response status is not successful (e.g., 403 Forbidden)
//     throw new Error('Failed to fetch albums: ' + res.statusText);
//   } catch (err) {
//     console.error("Error in getAlbums:", err);
//     throw err; // Re-throw the error so AlbumIndex can catch it
//   }
// };

// // You will add other functions (createAlbum, deleteAlbum, etc.) here later...

// // --- Helper Function ---

// // Replicating your instructor's buildOptions to handle the JWT token securely
// function buildOptions(data, method = 'GET') {
//   const options = {
//     method,
//     headers: {
//       // 2. IMPORTANT: Get the token from localStorage
//       Authorization: `Bearer ${localStorage.getItem('token')}`, 
//       'Content-Type': 'application/json',
//     },
//   };
//   // If we need to send json data with the request (POST, PUT, PATCH)
//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   // console.log(options); // Optional for debugging

//   return options;
// }


// export { getAlbums, signIn, signUp};