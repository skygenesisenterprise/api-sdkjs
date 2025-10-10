#!/usr/bin/env node

/**
 * Pre-publish checklist script
 * Run this before publishing to ensure everything is ready
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-publish checks...\n');

const checks = [
  {
    name: 'Package.json validation',
    check: () => {
      const pkg = require('../package.json');
      if (!pkg.name.startsWith('@skygenesisenterprise/')) {
        throw new Error('Package name should start with @skygenesisenterprise/');
      }
      if (!pkg.version) {
        throw new Error('Version is required');
      }
      if (pkg.private !== false) {
        throw new Error('Package should be explicitly public (private: false)');
      }
      console.log(`✅ Package: ${pkg.name}@${pkg.version} (public)`);
    }
  },
  {
    name: 'Dependencies check',
    check: () => {
      const pkg = require('../package.json');
      const deps = Object.keys(pkg.dependencies || {});
      if (deps.length === 0) {
        throw new Error('No dependencies found');
      }
      console.log(`✅ Dependencies: ${deps.join(', ')}`);
    }
  },
  {
    name: 'Main file exists',
    check: () => {
      const pkg = require('../package.json');
      if (!fs.existsSync(pkg.main)) {
        throw new Error(`Main file ${pkg.main} does not exist`);
      }
      console.log(`✅ Main file: ${pkg.main}`);
    }
  },
  {
    name: 'Repository URL check',
    check: () => {
      const pkg = require('../package.json');
      if (!pkg.repository.url.includes('skygenesisenterprise/api-sdk')) {
        throw new Error('Repository URL should point to skygenesisenterprise/api-sdk');
      }
      console.log(`✅ Repository: ${pkg.repository.url}`);
    }
  },
  {
    name: 'Publish workflow check',
    check: () => {
      const fs = require('fs');
      const path = require('path');
      const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'publish.yml');

      if (!fs.existsSync(workflowPath)) {
        throw new Error('Publish workflow not found');
      }

      const workflow = fs.readFileSync(workflowPath, 'utf8');
      if (!workflow.includes('--access public')) {
        throw new Error('Workflow should use --access public for scoped packages');
      }

      console.log('✅ Publish workflow configured for public access');
    }
  },
  {
    name: 'Import test',
    check: () => {
      try {
        const sdk = require('../index')('test-key');
        if (typeof sdk.users.create !== 'function') {
          throw new Error('SDK methods not available');
        }
        console.log('✅ SDK imports correctly');
      } catch (error) {
        throw new Error(`Import failed: ${error.message}`);
      }
    }
  },
  {
    name: 'Dry run publish',
    check: () => {
      try {
        // Skip test execution during dry run by temporarily modifying the test script
        const originalTestScript = 'echo "Error: no test specified" && exit 1';
        const tempTestScript = 'echo "Tests skipped for dry run"';

        // For now, just check if npm pack works
        execSync('npm pack --dry-run > /dev/null 2>&1', { stdio: 'pipe' });
        console.log('✅ Package structure is valid');
      } catch (error) {
        throw new Error(`Package validation failed: ${error.message}`);
      }
    }
  }
];

let passed = 0;
let failed = 0;

for (const { name, check } of checks) {
  try {
    check();
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failed++;
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n❌ Pre-publish checks failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('\n✅ All pre-publish checks passed! Ready to publish.');
}