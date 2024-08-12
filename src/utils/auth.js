import {jwtDecode} from 'jwt-decode';

// Function to get the JWT from localStorage
export const getToken = () => localStorage.getItem('authToken');

// Function to decode the JWT and get user info
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert to seconds

  return decodedToken.exp < currentTime;
};

// Function to check if the JWT is valid
export const isAuthenticated = () => {
  const token = getToken();
  const isExpired = isTokenExpired(token)
  console.log(isExpired)
  if (!token||isExpired) return false;
  
  const decodedToken = decodeToken(token);
  console.log(decodeToken)
  if (!decodedToken) return false;
  
  return true;
};

// Function to check if the user has a specific role
export const hasRole = (role) => {
  const token = getToken();
  if (!token) return false;
  
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.role) return false;
  
  return decodedToken.role === role;
};
