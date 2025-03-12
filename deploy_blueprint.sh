#!/bin/bash

# Source environment variables
source ~/.render_api_env

echo "Deploying to Render via Blueprint API..."

OWNER_ID="tea-csp9bbbgbbvc73cel3bg"
REPO_URL="https://github.com/thebiggestcookie/hello-world-spinner"

# Create a new Blueprint deployment from the GitHub repository
curl -X POST "https://api.render.com/v1/blueprints" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "'$OWNER_ID'",
    "repoUrl": "'$REPO_URL'",
    "branch": "main",
    "name": "hello-world-spinner-blueprint"
  }'

echo ""
echo "Blueprint deployment initiated!"
echo "Your app will be deployed according to the render.yaml configuration in your repository."
echo "Check https://dashboard.render.com to monitor the deployment status."
echo "Once deployed, your app will be available at https://hello-world-spinner.onrender.com"
