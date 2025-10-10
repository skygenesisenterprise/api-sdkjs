const sdk = require('./src/SkyGenesisSDK');

// Export factory function (Stripe-like pattern)
module.exports = sdk;

// Also export the class for advanced usage
module.exports.SkyGenesis = sdk.SkyGenesis;

// Export error classes
module.exports.SkyGenesisError = sdk.SkyGenesisError;
module.exports.AuthenticationError = sdk.AuthenticationError;
module.exports.ValidationError = sdk.ValidationError;
module.exports.APIError = sdk.APIError;