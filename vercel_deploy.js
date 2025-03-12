const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// You'll need to create a Vercel API token at https://vercel.com/account/tokens
// Then store it securely like you did with your Render and GitHub tokens
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

// Vercel team or user ID (get this from Vercel dashboard or API)
const TEAM_ID = process.env.VERCEL_TEAM_ID || '';

// Your GitHub repo details
const GITHUB_REPO = 'thebiggestcookie/hello-world-spinner';

async function deployToVercel() {
  try {
    console.log('Starting Vercel deployment...');

    // Step 1: Create a new Vercel project linked to your GitHub repo
    const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VERCEL_TOKEN}`
      },
      body: JSON.stringify({
        name: 'hello-world-spinner',
        gitRepository: {
          type: 'github',
          repo: GITHUB_REPO
        },
        framework: null, // Let Vercel auto-detect
        ...(TEAM_ID && { teamId: TEAM_ID })
      })
    });

    const projectData = await createProjectResponse.json();
    
    if (!createProjectResponse.ok) {
      console.error('Error creating project:', projectData);
      return;
    }

    console.log('Project created successfully:', projectData.name);

    // Step 2: Trigger a deployment
    const deploymentResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VERCEL_TOKEN}`
      },
      body: JSON.stringify({
        name: 'hello-world-spinner',
        project: projectData.id,
        target: 'production',
        gitSource: {
          type: 'github',
          repo: GITHUB_REPO,
          ref: 'main'
        },
        ...(TEAM_ID && { teamId: TEAM_ID })
      })
    });

    const deploymentData = await deploymentResponse.json();
    
    if (!deploymentResponse.ok) {
      console.error('Error triggering deployment:', deploymentData);
      return;
    }

    console.log('Deployment triggered successfully!');
    console.log(`Deployment URL: ${deploymentData.url}`);
    console.log('Check deployment status at https://vercel.com');

  } catch (error) {
    console.error('Error during deployment:', error);
  }
}

// Execute the function
deployToVercel();
