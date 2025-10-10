const skygenesis = require('@skygenesisenterprise/api-sdk')('sk-your-api-key-here');

async function basicUsage() {
  try {
    console.log('🚀 Sky Genesis Enterprise SDK Example\n');

    // Create a user
    console.log('📝 Creating a new user...');
    const newUser = await skygenesis.users.create({
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'developer'
    });
    console.log('✅ User created:', newUser);

    // Create a project
    console.log('\n📁 Creating a new project...');
    const newProject = await skygenesis.projects.create({
      name: 'Sample Project',
      description: 'A demonstration project',
      status: 'active'
    });
    console.log('✅ Project created:', newProject);

    // List users
    console.log('\n👥 Listing users...');
    const users = await skygenesis.users.list({ limit: 5 });
    console.log('✅ Users:', users);

    // List projects
    console.log('\n📋 Listing projects...');
    const projects = await skygenesis.projects.list({ limit: 5 });
    console.log('✅ Projects:', projects);

    // Update a project
    console.log('\n✏️  Updating project...');
    const updatedProject = await skygenesis.projects.update(newProject.id, {
      name: 'Updated Sample Project',
      description: 'An updated demonstration project'
    });
    console.log('✅ Project updated:', updatedProject);

    // Retrieve specific user
    console.log('\n🔍 Retrieving user details...');
    const userDetails = await skygenesis.users.retrieve(newUser.id);
    console.log('✅ User details:', userDetails);

    console.log('\n🎉 All operations completed successfully!');

  } catch (error) {
    console.error('\n❌ Error occurred:', error.message);

    if (error instanceof skygenesis.AuthenticationError) {
      console.log('💡 This is an authentication error. Please check your API key.');
    } else if (error instanceof skygenesis.ValidationError) {
      console.log('💡 This is a validation error. Please check your request parameters.');
    } else if (error instanceof skygenesis.APIError) {
      console.log(`💡 This is an API error (Status: ${error.statusCode}). Please check the API documentation.`);
    }
  }
}

// Authentication example
async function authExample() {
  try {
    console.log('\n🔐 Authentication Example');

    const authResponse = await skygenesis.auth.login({
      email: 'admin@example.com',
      password: 'password123'
    });

    console.log('✅ Authentication successful:', authResponse);

    // You can now use the token for subsequent requests
    // The SDK automatically handles the token in headers

  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
  }
}

// Error handling example
async function errorHandlingExample() {
  try {
    console.log('\n⚠️  Error Handling Example');

    // This will likely fail with invalid API key
    const invalidSdk = require('@skygenesisenterprise/api-sdk')('invalid-key');
    await invalidSdk.users.list();

  } catch (error) {
    console.log('✅ Error caught properly:', error.constructor.name);
    console.log('Error message:', error.message);
    console.log('Error type:', error.type);
  }
}

// Run examples
async function runExamples() {
  console.log('='.repeat(50));
  console.log('🌟 Sky Genesis Enterprise SDK Examples');
  console.log('='.repeat(50));

  await basicUsage();
  await authExample();
  await errorHandlingExample();

  console.log('\n' + '='.repeat(50));
  console.log('✨ Examples completed!');
  console.log('='.repeat(50));
}

// Check if API key is provided
if (process.argv[2]) {
  // Use provided API key
  const skygenesisWithKey = require('@skygenesisenterprise/api-sdk')(process.argv[2]);
  Object.assign(skygenesis, skygenesisWithKey);
  runExamples();
} else {
  console.log('⚠️  No API key provided. Running with mock examples...');
  console.log('💡 To run with real API calls, provide your API key:');
  console.log('   node examples/basic-usage.js sk-your-api-key-here');
  console.log('\nRunning error handling example only...\n');
  errorHandlingExample();
}