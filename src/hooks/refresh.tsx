import axios from 'axios';

// Define a function to refresh the token
async function refreshAccessToken() {
    // Perform a request to refresh the token and get a new one
    const response = await axios.post('YOUR_REFRESH_ENDPOINT', {
      refreshToken: 'YOUR_REFRESH_TOKEN', // You may need to obtain this from your current token
    });

    // Store the new access token in a secure way (e.g., local storage or state)
    const newAccessToken = response.data.accessToken;

    // Update Axios with the new token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } 

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // If the response is successful, return it directly
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (you can customize this condition)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

        // Attempt to refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
     

    // For other errors, reject the promise
    return Promise.reject(error);
  }});

export default axios;
