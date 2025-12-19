const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.detail || data.message || 'An error occurred',
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message || 'Network error', 0);
    }
  },

  // Auth endpoints
  async login(email, password) {
    // The backend endpoint expects query parameters for POST request
    const params = new URLSearchParams({
      email,
      password,
    });

    const url = `${API_BASE_URL}/api/v1/auth/login?${params.toString()}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.detail || 'Invalid credentials',
        response.status
      );
    }

    return data;
  },

  async register(name, email, password, role = 'provider') {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  // Helper to save token
  saveToken(token) {
    localStorage.setItem('access_token', token);
  },

  // Helper to get token
  getToken() {
    return localStorage.getItem('access_token');
  },

  // Helper to remove token (logout)
  removeToken() {
    localStorage.removeItem('access_token');
  },

  // Helper to check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
};

export default api;

