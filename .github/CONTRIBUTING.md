### 📄 `CONTRIBUTING.md`

# Contributing to Sky Genesis Enterprise API SDK

Thank you for your interest in contributing to **Sky Genesis Enterprise API SDK**!
We welcome community contributions and feedback, while the project is also maintained and developed by [Sky Genesis Enterprise](https://skygenesisenterprise.com).

---

## 📦 About the Project

**Sky Genesis Enterprise API SDK** is the official API SDK of Sky Genesis Enterprise, licensed under **ISC**, with both:

- A **free and self-hostable version** for the open-source community
- A **commercial edition** with additional features and premium support maintained by Sky Genesis Enterprise

We value collaboration and are happy to accept pull requests, bug reports, and feature suggestions from the community.

---

## 🧭 Code of Conduct

We follow a [Code of Conduct](https://github.com/skygenesisenterprise/api-sdk/CODE_OF_CONDUCT.md) to ensure a safe, respectful, and inclusive environment.  
Please make sure you read and respect it before contributing.

---

## 🛠️ How to Contribute

### 1. Fork the Repository

Use the GitHub UI to create a fork, then clone it locally:

```bash
git clone https://github.com/skygenesisenterprise/api-sdk.git
cd api-sdk
```

### 2. Set Up Locally

Install dependencies and run the development server (example for TypeScript/Node):

```bash
pnpm install
pnpm run dev
```

> See [README.md](./README.md) for platform-specific setup instructions.

---

### 3. Create a Feature or Fix Branch

Follow the naming convention:

```
fix/bug-title
feature/new-feature-name
docs/update-docs-section
```

```bash
git checkout -b feature/your-feature
```

---

### 4. Make Your Changes

Follow the coding standards and linting rules (we use ESLint + Prettier).
Please write tests if applicable, and update documentation when necessary.

---

### 5. Run Tests

Ensure your code doesn’t break existing functionality:

```bash
npm test
```

---

### 6. Submit a Pull Request

Push to your fork and open a Pull Request via the GitHub UI.

* Use the provided [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)
* Link to relevant issues if applicable (e.g., `Closes #123`)
* Our team will review your contribution — we may request changes

---

## 🧠 Contribution Scope

You may contribute in the following areas:

* ✨ New features (frontend or backend)
* 🐛 Bug fixes
* 📝 Documentation improvements
* ⚙️ Dev tooling, performance, testing
* 💬 Discussions and ideas

Please note that **final decisions regarding project direction, architecture, and priorities are made by Sky Genesis Enterprise.**

---

## 🚀 Publishing Releases

### For Maintainers

The SDK is automatically published to npm when a version tag is created. The process is:

1. **Update version** (maintainers only):
   ```bash
   npm run release:patch  # for bug fixes (1.0.1)
   npm run release:minor  # for new features (1.1.0)
   npm run release:major  # for breaking changes (2.0.0)
   ```

2. **GitHub Actions** will automatically:
   - Run tests and linting
   - Publish to npm registry
   - Create a GitHub release

### Requirements

- `NPM_TOKEN` secret configured in repository settings
- Tests must pass
- Code must be linted

---

## 📩 Questions or Suggestions?

Open a [GitHub Discussion](https://github.com/skygenesisenterprise/api-sdk/discussions)
Or reach out to us at [contact@skygenesisenterprise.com](mailto:contact@skygenesisenterprise.com)

Thank you for helping improve the Sky Genesis Enterprise API SDK! 💌
