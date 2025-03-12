const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// API key should be stored as an environment variable
const apiKey = process.env.RENDER_API_KEY;

// Function to create a new web service on Render via direct upload
function createRenderService() {
  const data = JSON.stringify({
    name: 'hello-world-spinner',
    type: 'web_service',
    env: 'node',
    region: 'oregon',
    plan: 'free',
    buildCommand: 'npm install',
    startCommand: 'npm start',
    envVars: [
      {
        key: 'NODE_ENV',
        value: 'production'
      }
    ],
    autoDeploy: false // Disable auto deploy since we're not using a Git repository
  });

  const options = {
    hostname: 'api.render.com',
    port: 443,
    path: '/v1/services',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  };

  const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log('Response status:', res.statusCode);
      try {
        const parsedData = JSON.parse(responseData);
        console.log('Service created:', parsedData);
        
        if (parsedData.id) {
          console.log(`Service created with ID: ${parsedData.id}`);
          console.log(`Your app will be available at: ${parsedData.service.subdomain}.onrender.com`);
          console.log(`You can manage your service at: https://dashboard.render.com/web/${parsedData.id}`);
        }
      } catch (e) {
        console.log('Raw response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error creating service:', error);
  });

  req.write(data);
  req.end();
}

// Execute the function
if (!apiKey) {
  console.error('RENDER_API_KEY environment variable is not set');
  process.exit(1);
}

console.log('Creating service on Render...');
createRenderService();
