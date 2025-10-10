
# Sky Genesis Enterprise API SDK for Node.js

The **Sky Genesis Enterprise API SDK** provides a developer-friendly interface to interact with the Sky Genesis Enterprise API, inspired by Stripe's SDK design. Simply provide your API key and start using the API with automatic authentication and request handling.

---

## 📦 Installation

```bash
npm install @skygenesisenterprise/api-sdk
# or
pnpm add @skygenesisenterprise/api-sdk
# or
yarn add @skygenesisenterprise/api-sdk
```

---

## ⚡ Quick Start

```javascript
const skygenesis = require('@skygenesisenterprise/api-sdk')('sk-your-api-key-here');

// Create a user
const user = await skygenesis.users.create({
  email: 'user@example.com',
  name: 'John Doe'
});

// Create a project
const project = await skygenesis.projects.create({
  name: 'My Awesome Project',
  description: 'A project description'
});

// List all projects
const projects = await skygenesis.projects.list();
```

---

## 🧩 Resources

The SDK provides access to different API resources through organized methods:

* **auth** – Authentication operations (login, logout, token refresh)
* **users** – User management (CRUD operations)
* **projects** – Project management (CRUD operations)

---

## 🔑 Authentication

Just like Stripe, you only need to provide your API key when initializing the SDK:

```javascript
const skygenesis = require('@skygenesisenterprise/api-sdk')('sk-your-api-key-here');
```

The SDK automatically handles authentication headers for all requests.

### Local Development

During development, you can test the SDK locally before publishing:

```bash
# Install dependencies
pnpm install

# Run the example
pnpm run example

# Or run with your API key
node examples/basic-usage.js sk-your-api-key-here
```

To use the local version in another project:

```bash
# In your other project
npm install /path/to/api-sdkjs

# Or using relative path
npm install ../api-sdkjs
```

---

## 📚 Features

* **Stripe-inspired API**: Familiar interface for developers
* **Automatic Authentication**: API key handling built-in
* **Smart Error Handling**: Custom error classes with detailed information
* **TypeScript Support**: JSDoc types for better IDE experience
* **Retry Logic**: Automatic network retry for failed requests
* **Timeout Management**: Configurable request timeouts

---

## 🛠 Usage Examples

### Authentication
```javascript
const skygenesis = require('@skygenesisenterprise/api-sdk')('sk-your-api-key-here');

// Login with credentials
try {
  const authResponse = await skygenesis.auth.login({
    email: 'admin@example.com',
    password: 'securepassword'
  });
  console.log('Logged in:', authResponse.user);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### User Management
```javascript
// Create a new user
const newUser = await skygenesis.users.create({
  email: 'newuser@example.com',
  name: 'New User',
  role: 'member'
});

// Retrieve a user
const user = await skygenesis.users.retrieve('user_123456');

// Update user information
const updatedUser = await skygenesis.users.update('user_123456', {
  name: 'Updated Name',
  email: 'updated@example.com'
});

// List users with pagination
const users = await skygenesis.users.list({
  limit: 20,
  offset: 0
});

// Delete a user
await skygenesis.users.delete('user_123456');
```

### Project Management
```javascript
// Create a project
const project = await skygenesis.projects.create({
  name: 'E-commerce Platform',
  description: 'A modern e-commerce solution',
  status: 'active'
});

// Retrieve a specific project
const projectDetails = await skygenesis.projects.retrieve('proj_123456');

// Update project
const updatedProject = await skygenesis.projects.update('proj_123456', {
  name: 'Updated Project Name',
  status: 'completed'
});

// List projects with filters
const activeProjects = await skygenesis.projects.list({
  status: 'active',
  limit: 10
});

// Delete a project
await skygenesis.projects.delete('proj_123456');
```

### Error Handling
```javascript
try {
  const user = await skygenesis.users.retrieve('invalid_id');
} catch (error) {
  if (error instanceof skygenesis.AuthenticationError) {
    console.log('Authentication failed');
  } else if (error instanceof skygenesis.ValidationError) {
    console.log('Invalid request:', error.param);
  } else if (error instanceof skygenesis.APIError) {
    console.log('API error:', error.statusCode, error.message);
  }
}
```

### Advanced Configuration
```javascript
const skygenesis = require('api-sdkjs')('sk-your-api-key-here', {
  baseURL: 'https://api.staging.skygenesisenterprise.com',
  timeout: 60000,
  maxNetworkRetries: 3
});

// Change API key dynamically
skygenesis.setApiKey('sk-new-api-key-here');

// Adjust timeout
skygenesis.setTimeout(45000);
```

---

## 🚀 Advanced Usage

### Using the Class Directly
```javascript
const { SkyGenesis } = require('api-sdkjs');

const sdk = new SkyGenesis('sk-your-api-key-here', {
  timeout: 30000
});

// Access resources
const users = await sdk.users.list();
```

### Environment Variables
```javascript
// .env file
SKYGENESIS_API_KEY=sk-your-api-key-here

// In your code
const skygenesis = require('api-sdkjs')(process.env.SKYGENESIS_API_KEY);
```

---

## 🚀 Contribution

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📦 Publishing

This package is published to npm under the scoped name `@skygenesisenterprise/api-sdk`.

### For Maintainers

To publish a new version:

```bash
# Update version (patch, minor, or major)
npm run version:patch  # or version:minor or version:major

# Publish to npm
npm publish

# Or dry-run first
npm run publish:dry-run
```

### Version Management

- **Patch** (`1.0.1`): Bug fixes and small improvements
- **Minor** (`1.1.0`): New features, backward compatible
- **Major** (`2.0.0`): Breaking changes

---

## 📄 License

[ISC License](LICENSE)
