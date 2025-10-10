# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD.

## 📋 Workflows

### 🔄 `ci.yml` - Continuous Integration

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Actions:**
- Tests on Node.js 16.x, 18.x, and 20.x
- Runs linting
- Executes example code (dry run)
- Ensures code quality across versions

### 📦 `publish.yml` - Automated Publishing

**Triggers:**
- Push of version tags (e.g., `v1.0.1`)

**Actions:**
- Runs full test suite
- Lints code
- Publishes to npm registry
- Creates GitHub release

## 🔧 Configuration

### Required Secrets

Add these secrets in your repository settings:

- `NPM_TOKEN`: npm automation token for publishing

### Branch Protection

Consider setting up branch protection rules for:
- `main` branch: Require CI to pass
- Require pull request reviews
- Require status checks

## 🚀 Usage

### Creating a Release

1. Ensure all changes are merged to `main`
2. Run locally: `npm run release:patch` (or `minor`/`major`)
3. Push the tag: `git push --follow-tags`
4. GitHub Actions will handle the rest automatically

### Manual Publishing

If needed, you can publish manually:

```bash
npm login
npm publish
```

But prefer the automated workflow for consistency.