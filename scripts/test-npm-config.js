#!/usr/bin/env node

/**
 * Test script to verify npm configuration before publishing
 */

const { execSync } = require('child_process');

console.log('🔍 Testing npm configuration...\n');

const tests = [
  {
    name: 'npm login status',
    check: () => {
      try {
        const output = execSync('npm whoami', { encoding: 'utf8' }).trim();
        console.log(`✅ Logged in as: ${output}`);
        return true;
      } catch (error) {
        console.log('❌ Not logged in to npm');
        console.log('💡 Run: npm login');
        return false;
      }
    }
  },
  {
    name: 'Package access check',
    check: () => {
      const pkg = require('../package.json');
      if (pkg.private === false) {
        console.log('✅ Package configured as public');
        return true;
      } else {
        console.log('❌ Package is private or not explicitly public');
        return false;
      }
    }
  },
  {
    name: 'Registry configuration',
    check: () => {
      try {
        const output = execSync('npm config get registry', { encoding: 'utf8' }).trim();
        if (output === 'https://registry.npmjs.org/') {
          console.log('✅ Registry configured correctly');
          return true;
        } else {
          console.log(`❌ Wrong registry: ${output}`);
          console.log('💡 Run: npm config set registry https://registry.npmjs.org/');
          return false;
        }
      } catch (error) {
        console.log('❌ Cannot check registry');
        return false;
      }
    }
  },
  {
    name: 'Publish access test',
    check: () => {
      try {
        // Test with dry-run
        execSync('npm publish --dry-run --access public > /dev/null 2>&1', { stdio: 'pipe' });
        console.log('✅ Publish access test passed');
        return true;
      } catch (error) {
        console.log('❌ Publish access test failed');
        console.log('💡 Check your npm token permissions');
        return false;
      }
    }
  }
];

let passed = 0;
let total = tests.length;

for (const test of tests) {
  if (test.check()) {
    passed++;
  }
}

console.log(`\n📊 Results: ${passed}/${total} tests passed`);

if (passed === total) {
  console.log('\n✅ npm configuration is ready for publishing!');
  console.log('🚀 You can now create a release tag.');
} else {
  console.log('\n❌ Some tests failed. Please fix the issues above.');
  console.log('📖 See TROUBLESHOOTING.md for detailed solutions.');
  process.exit(1);
}