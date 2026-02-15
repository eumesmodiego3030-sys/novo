import { trackEvent } from './sentry';

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are Tatiana Torres' beauty and aesthetics assistant. You help clients with questions about beauty treatments, skincare, makeup, and booking appointments. Always be friendly, professional, and guide customers towards booking services. If the user wants to schedule an appointment, collect their name, email, phone, preferred date, and treatment type. Speak in a warm and welcoming tone.`;

export async function sendChatMessage(
  messages: OpenAIMessage[],
  conversationId: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const messagesWithSystem: OpenAIMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },
    ...messages,
  ];

  try {
    trackEvent('chat_message_sent', {
      conversationId,
      messageCount: messages.length,
    });

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `OpenAI API error: ${error.error?.message || response.statusText}`
      );
    }

    const data: ChatCompletionResponse = await response.json();
    const assistantMessage =
      data.choices[0]?.message?.content ||
      'I apologize, I could not generate a response. Please try again.';

    trackEvent('chat_message_received', {
      conversationId,
      tokenCount: data.usage?.total_tokens,
      model: data.model,
    });

    return assistantMessage;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    trackEvent('chat_error', {
      conversationId,
      error: errorMessage,
    });

    throw error;
  }
}

export async function generateInitialMessage(
  conversationId: string
): Promise<string> {
  const welcomeMessages = [
    "Olá! 👋 Bem-vinda ao atendimento Tatiana Torres! Como posso ajudá-la hoje? Quer conhecer nossos tratamentos, tirar dúvidas ou agendar um horário?",
    "Oi! 💄 Sou a assistente da Tatiana Torres. Posso ajudá-la com informações sobre nossos serviços de beleza ou ajudar você a agendar um atendimento. O que você gostaria de saber?",
    "Bem-vinda! ✨ Aqui você pode esclarecer dúvidas sobre tratamentos estéticos, cuidados com a pele, ou agendar seu próximo horário comigo. Como posso ser útil?",
  ];

  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  trackEvent('chat_session_started', {
    conversationId,
  });

  return randomMessage;
}

export function extractAppointmentDetails(text: string): Partial<{
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
}> {
  const details: Partial<{
    name: string;
    email: string;
    phone: string;
    treatment: string;
    date: string;
  }> = {};

  // Email regex
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) details.email = emailMatch[1];

  // Phone regex (Brazilian format)
  const phoneMatch = text.match(/\(?([0-9]{2})\)?\s?9?([0-9]{4})-?([0-9]{4})/);
  if (phoneMatch) details.phone = phoneMatch[0];

  // Common treatment keywords
  const treatments = [
    'microblading',
    'limpeza de pele',
    'hidratação',
    'peeling',
    'botox',
    'preenchimento',
    'depilação',
    'design de sobrancelha',
  ];

  treatments.forEach((treatment) => {
    if (text.toLowerCase().includes(treatment)) {
      details.treatment = treatment;
    }
  });

  return details;
}
