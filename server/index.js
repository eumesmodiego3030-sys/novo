// ============================================
// CHATBOT BACKEND - Express Server
// Handles OpenAI requests securely
// ============================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import OpenAI SDK
let openai;
try {
  const { OpenAI } = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error('❌ OpenAI SDK not installed');
  console.error('Run: npm install openai');
  process.exit(1);
}

// ============================================
// POST /api/chat - Main chat endpoint
// ============================================
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No messages provided',
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI API key not configured on server',
      });
    }

    // System prompt - customize for your business
    const systemPrompt = `You are Tatiana Torres' AI beauty consultant. Your role is to:

1. Answer questions about treatments:
   - Botox (smooths wrinkles)
   - Fillers (adds volume)
   - Laser treatments (skin rejuvenation)
   - Micropigmentation (eyebrows, lips)
   - Other beauty procedures

2. Help with:
   - Appointment scheduling (direct to contact form)
   - Pricing information
   - Aftercare instructions
   - Beauty and skincare tips
   - Treatment benefits and risks

3. Communication style:
   - Professional but friendly
   - Concise (2-3 sentences max, unless asked for more)
   - Respond in English or Portuguese as user prefers
   - Always suggest contacting for specific scheduling

4. When to recommend contact:
   - Specific appointment times
   - Custom treatment plans
   - Detailed consultations
   - Payment information

Be helpful, honest, and always recommend professional consultation for important decisions.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can use gpt-4 for better quality
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7, // 0-1: lower = more deterministic, higher = more creative
      max_tokens: 500, // Limit response length
    });

    const assistantMessage =
      response.choices[0]?.message?.content || 'Unable to generate response';

    console.log(`✅ Chat response generated (${assistantMessage.length} chars)`);

    return res.json({
      success: true,
      message: assistantMessage,
    });
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        error: '❌ OpenAI API key is invalid. Check your credentials.',
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        error: '⏱️ Rate limit exceeded. Try again in a moment.',
      });
    }

    console.error('❌ Chat API error:', error.message);

    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown error occurred',
    });
  }
});

// ============================================
// GET /health - Health check endpoint
// ============================================
app.get('/health', (req, res) => {
  const status = {
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    openaiConfigured: !!process.env.OPENAI_API_KEY,
  };

  res.json(status);
});

// ============================================
// Error handling middleware
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// ============================================
// Start server
// ============================================
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   ✅ CHATBOT BACKEND RUNNING              ║
╚════════════════════════════════════════════╝

📡 Server: http://localhost:${PORT}
🌍 Environment: ${NODE_ENV}
🔑 OpenAI API: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ NOT SET'}
  `);

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY not set in .env');
    console.warn('   Chat endpoint will fail until you set it!');
  }

  console.log('📡 Endpoints:');
  console.log('   POST http://localhost:' + PORT + '/api/chat');
  console.log('   GET  http://localhost:' + PORT + '/health\n');
});

module.exports = app;
