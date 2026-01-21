# Backend Proxy (Optional)

This minimal backend keeps your Gemini API key off the frontend by proxying requests.

## Setup

```bash
cd backend
npm install
export GEMINI_API_KEY="your_gemini_key"
npm start
```

## Endpoints

### Health check
`GET /healthz`

### Generate content (text prompt)
`POST /api/generate`

Example:
```bash
curl -X POST http://localhost:8080/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello world"}'
```

> Note: You will need to update the frontend to call this backend endpoint instead of using the Gemini SDK directly.
