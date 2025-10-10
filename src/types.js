// Type definitions for better developer experience
// This file provides JSDoc types for IDE autocompletion

/**
 * @typedef {Object} SDKConfig
 * @property {string} [baseURL='https://api.skygenesisenterprise.com'] - Base URL for API requests
 * @property {number} [timeout=30000] - Request timeout in milliseconds
 * @property {number} [maxNetworkRetries=2] - Maximum network retry attempts
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Project
 * @property {string} id - Project ID
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string} status - Project status
 * @property {string} ownerId - Owner user ID
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} AuthCredentials
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - Access token
 * @property {string} refreshToken - Refresh token
 * @property {number} expiresIn - Token expiration time
 * @property {User} user - User information
 */

/**
 * @typedef {Object} ListResponse
 * @property {Array} data - Array of items
 * @property {boolean} hasMore - Whether there are more items
 * @property {string} [nextCursor] - Cursor for next page
 * @property {number} total - Total number of items
 */

module.exports = {};