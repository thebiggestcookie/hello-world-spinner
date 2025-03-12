# Hello World Spinner

A simple web application that displays "Hello World" with a spinning smiley face.

## Local Development

```bash
npm install
npm start
```

## Deployment to Render

### Method 1: Deploy via Render Dashboard

1. Sign in to your Render account: https://dashboard.render.com/
2. Click on "New" and select "Web Service"
3. Connect to your repository or select "Deploy from existing repository"
4. Configure your service:
   - Name: hello-world-spinner
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select the Free plan
5. Click "Create Web Service"

### Method 2: Deploy via Render API (Using your API key)

```bash
# Set your Render API key as an environment variable
export RENDER_API_KEY=rnd_JNqVCaGi3jfvDeyf6zhWhJgWKI6G

# Create a new service using Render's API
curl -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "hello-world-spinner",
    "type": "web_service",
    "runtime": "node",
    "region": "oregon",
    "plan": "free",
    "buildCommand": "npm install",
    "startCommand": "npm start",
    "autoDeploy": "yes",
    "envVars": [
      {
        "key": "NODE_ENV",
        "value": "production"
      }
    ]
  }'
```

After deployment, your application will be available at the URL provided by Render.
