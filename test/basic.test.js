const sdk = require('../index');

describe('Basic SDK Tests', () => {
  test('SDK can be imported', () => {
    expect(sdk).toBeDefined();
  });

  test('SDK factory function works', () => {
    const instance = sdk('test-key');
    expect(instance).toBeDefined();
    expect(typeof instance.users.create).toBe('function');
    expect(typeof instance.projects.list).toBe('function');
  });

  test('SDK throws error without API key', () => {
    expect(() => sdk()).toThrow('API key is required');
  });

  test('Error classes are exported', () => {
    expect(sdk.SkyGenesisError).toBeDefined();
    expect(sdk.AuthenticationError).toBeDefined();
    expect(sdk.ValidationError).toBeDefined();
    expect(sdk.APIError).toBeDefined();
  });
});