# ChatBot Backend API

Simple Express server for handling OpenAI chat requests securely.

## Security

✅ **Why Backend?**
- API keys NEVER exposed to frontend
- Sensitive data stays on server
- Rate limiting can be added
- CORS controlled properly

❌ **Never do this:**
```javascript
// BAD: Key exposed in frontend
const response = await openai.chat.completions.create(...)
```

✅ **Always do this:**
```javascript
// GOOD: Backend handles the request
const response = await fetch('/api/chat', {...})
```

---

## Setup

### 1. Install Dependencies
```bash
cd server
npm install express cors dotenv openai
```

### 2. Create `.env` file
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 3. Run Server
```bash
node index.js
# or with auto-reload:
npm install -D nodemon
npx nodemon index.js
```

Server runs on: `http://localhost:3001`

---

## API Endpoints

### POST `/api/chat`
Send chat message to OpenAI

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "How can I help you with your beauty treatment?"
}
```

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "ok": true,
  "timestamp": "2025-02-15T10:00:00Z"
}
```

---

## Environment Variables

Create `.env` file (don't commit!):
```env
OPENAI_API_KEY=sk_your_key_here
PORT=3001
NODE_ENV=development
```

---

## Frontend Integration

Frontend calls backend, never OpenAI directly:

```typescript
// src/hooks/useChat.ts
const response = await fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages })
});
```

---

## Troubleshooting

**CORS Error?**
- Frontend and backend on different ports? That's normal!
- CORS is enabled in server (cors middleware)
- Check backend URL in frontend `.env.local`

**TimeoutError?**
- Backend not running? Start with `node index.js`
- OpenAI API slow? Check your internet connection
- API key expired? Generate a new one

**420 Error (OpenAI)?**
- Rate limit exceeded
- Check your OpenAI account usage
- Add delays between requests

---

## Production Deployment

When deploying:

1. Set `OPENAI_API_KEY` as environment variable (not in code)
2. Set backend URL in frontend `.env.production`
3. Update CORS to allow only your domain
4. Add rate limiting middleware
5. Add request validation
6. Add logging/monitoring

---

## Files

- `index.js` - Main server file
- `.env.example` - Environment template
- `.env` - Local configuration (not committed)

---

**Important:** ⚠️ NEVER commit `.env` file with API keys! It's in `.gitignore`.
