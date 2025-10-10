const axios = require('axios');

// Custom error classes
class SkyGenesisError extends Error {
  constructor(message, type, code, param) {
    super(message);
    this.type = type;
    this.code = code;
    this.param = param;
    this.name = 'SkyGenesisError';
  }
}

class AuthenticationError extends SkyGenesisError {
  constructor(message = 'Authentication failed') {
    super(message, 'authentication_error', 'auth_failed');
  }
}

class ValidationError extends SkyGenesisError {
  constructor(message, param) {
    super(message, 'validation_error', 'invalid_request', param);
  }
}

class APIError extends SkyGenesisError {
  constructor(message, statusCode) {
    super(message, 'api_error', 'api_error');
    this.statusCode = statusCode;
  }
}

// Base resource class
class Resource {
  constructor(client) {
    this.client = client;
  }

  async _request(method, path, data = null, options = {}) {
    try {
      const config = {
        method,
        url: path,
        ...options
      };

      if (data && (method === 'post' || method === 'put' || method === 'patch')) {
        config.data = data;
      } else if (data && (method === 'get' || method === 'delete')) {
        config.params = data;
      }

      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        throw new AuthenticationError(data.message || 'Invalid API key');
      } else if (status === 400) {
        throw new ValidationError(data.message || 'Invalid request parameters', data.param);
      } else {
        throw new APIError(data.message || 'API request failed', status);
      }
    } else if (error.request) {
      throw new APIError('Network error: No response received from API', 0);
    } else {
      throw new APIError(`Request error: ${error.message}`, 0);
    }
  }
}

// Resource classes
class Auth extends Resource {
  async login(credentials) {
    return this._request('post', '/auth/login', credentials);
  }

  async logout() {
    return this._request('post', '/auth/logout');
  }

  async refreshToken(refreshToken) {
    return this._request('post', '/auth/refresh', { refreshToken });
  }
}

class Users extends Resource {
  async create(data) {
    return this._request('post', '/users', data);
  }

  async retrieve(userId) {
    return this._request('get', `/users/${userId}`);
  }

  async update(userId, data) {
    return this._request('put', `/users/${userId}`, data);
  }

  async list(params = {}) {
    return this._request('get', '/users', params);
  }

  async delete(userId) {
    return this._request('delete', `/users/${userId}`);
  }
}

class Projects extends Resource {
  async create(data) {
    return this._request('post', '/projects', data);
  }

  async retrieve(projectId) {
    return this._request('get', `/projects/${projectId}`);
  }

  async update(projectId, data) {
    return this._request('put', `/projects/${projectId}`, data);
  }

  async list(params = {}) {
    return this._request('get', '/projects', params);
  }

  async delete(projectId) {
    return this._request('delete', `/projects/${projectId}`);
  }
}

// Main SDK class
class SkyGenesis {
  constructor(apiKey, config = {}) {
    if (!apiKey) {
      throw new AuthenticationError('API key is required');
    }

    this.apiKey = apiKey;
    this.baseURL = config.baseURL || 'https://api.skygenesisenterprise.com';
    this.timeout = config.timeout || 30000;
    this.maxNetworkRetries = config.maxNetworkRetries || 2;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'SkyGenesis-NodeJS-SDK/1.0.0'
      }
    });

    // Initialize resources
    this.auth = new Auth(this.client);
    this.users = new Users(this.client);
    this.projects = new Projects(this.client);
  }

  // Static method to create instance (Stripe-like pattern)
  static create(apiKey, config = {}) {
    return new SkyGenesis(apiKey, config);
  }

  // Configuration methods
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.client.defaults.headers.Authorization = `Bearer ${apiKey}`;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
    this.client.defaults.timeout = timeout;
  }
}

// Export both the class and a factory function for Stripe-like usage
module.exports = function(apiKey, config = {}) {
  return new SkyGenesis(apiKey, config);
};

module.exports.SkyGenesis = SkyGenesis;
module.exports.SkyGenesisError = SkyGenesisError;
module.exports.AuthenticationError = AuthenticationError;
module.exports.ValidationError = ValidationError;
module.exports.APIError = APIError;