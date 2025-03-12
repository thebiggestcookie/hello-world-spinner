#!/bin/bash

# Import API keys from environment files
source ~/.render_api_env

echo "Creating Render service from GitHub repository..."

# Deploy using render-cli approach
curl -X POST "https://api.render.com/v1/services" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "type": "web_service",
  "name": "hello-world-spinner",
  "ownerId": "tea-csp9bbbgbbvc73cel3bg",
  "repo": "https://github.com/thebiggestcookie/hello-world-spinner.git",
  "branch": "main",
  "autoDeploy": true,
  "buildCommand": "npm install",
  "startCommand": "npm start",
  "plan": "free",
  "region": "oregon",
  "envVars": [
    {
      "key": "NODE_ENV",
      "value": "production"
    }
  ]
}
EOF

echo "Deployment initiated. Your app will be available at https://hello-world-spinner.onrender.com once deployed."
echo "You can also check the status at https://dashboard.render.com"
